<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Produto;
use Validator;
use Illuminate\Pagination\Paginator;

class ProdutoController extends Controller
{
    //Método nativo do Laravel para validar a entrada de dados
    protected function validarProduto($request){
        $validator = Validator::make($request->all(),[
            'nome' => 'required',
            'marca' => 'required',
            'validade' => 'required|date',
            'preco' => 'required|numeric|min:0',
            'quantidade' => 'required|numeric|min:0',
        ]);
        return $validator;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        try {
            $qtd = $request['qtd'];
            $page = $request['page'];

            Paginator::currentPageResolver(function () use ($page) {
                return $page;
            });

            $produtos = Produto::paginate($qtd);
            $produtos = $produtos->appends(Request::capture()->except('page')); 

            return response()->json(['produtos'=>$produtos], 200);
        }catch (\Exception $e) {
            return response()->json('Ocorreu um erro no servidor', 500);
        }
        
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try {
            $validator = $this->validarProduto($request);
            if ($validator->fails()) {
                return response()->json(['message'=>'Erro', 'errors' => $validator->errors()], 400);
            }

            $data = $request->only(['nome', 'marca', 'validade', 'preco', 'quantidade']);

            if ($data) {
                $produto = Produto::create($data);
                if ($produto) {
                    return response()->json(['data'=> $produto], 201);
                }else{
                    return response()->json(['message'=> 'Erro ao cadastrar produto!'], 400);
                }            
            }else{
                return response()->json(['message'=> 'Dados inválidos!'], 400);
            }
        } catch (\Exception $e) {
            return response()->json('Ocorreu um erro no servidor', 500);
        }        
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try {
            if($id < 0){
                return response()->json(['message'=>'ID menor que zero, digite um válido'], 400);
            }
            $produto = Produto::find($id);
            if($produto){
                return response()->json([$produto], 200);
            }else{
                return response()->json(['message'=>'O produto com ID '.$id.' não existe'], 404);
            }
        } catch (\Exception $e) {
            return response()->json('Ocorreu um erro no servidor', 500);
        }        
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        try {
            $validator = $this->validarProduto($request);
            if($validator->fails()){
                return response()->json(['message'=>'Erro', 'errors' => $validator->errors()], 400);
            }
            $data = $request->only(['nome', 'marca', 'validade', 'preco', 'quantidade']);
            if($data){
                $produto = Produto::find($id);
                if($produto){
                    $produto->update($data);
                     return response()->json(['data'=> $produto], 200);
                }else{
                    return response()->json(['message'=>'O produto com id '.$id.' não existe'], 400);
                }
            }else{
                return response()->json(['message'=>'Dados inválidos'], 400);
            }
        } catch (\Exception $e) {
            return response()->json('Ocorreu um erro no servidor', 500);
        }        
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)    
    {
        try {
            if($id < 0){
                return response()->json(['message'=>'ID menor que zero, informe um válido'], 400);
            }
            $produto = Produto::find($id);
            if($produto){
                $produto->delete();
                return response()->json([], 204);
            }else{
                return response()->json(['message'=>'O produto com id '.$id.' não existe'], 404);
            }    
        } catch (\Exception $e) {
            return response()->json('Ocorreu um erro no servidor', 500);
        }        
    }
}