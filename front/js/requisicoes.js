window.onload = function(e) {
	fetch(
		'http://localhost:8000/api/produtos', {		
		}).then(response => response.json())				
	.then(data => { 		
		//console.log(data);
		produtos = Object(data.produtos);				
		produtos.data.forEach(produto => {  
			var table = document.getElementById("tabelaprodutos");
			var row = table.insertRow(-1);
			var idColuna = row.insertCell(0);
			var nomeColuna = row.insertCell(1); 
			var marcaColuna = row.insertCell(2); 
			var quantidadeColuna = row.insertCell(3); 
			var validadeColuna = row.insertCell(4); 
			var precoColuna = row.insertCell(5);
			var editarColuna = row.insertCell(6);
			var excluirColuna = row.insertCell(7);  
			idColuna.innerHTML = produto.id;
			nomeColuna.innerHTML = produto.nome;
			marcaColuna.innerHTML = produto.marca;
			quantidadeColuna.innerHTML = produto.quantidade;
			validadeColuna.innerHTML = produto.validade;
			precoColuna.innerHTML = 'R$'+produto.preco;
			excluirColuna.innerHTML = '<button class="btn-default" onClick="removerProduto('+ produto.id +')">Deletar</button>';
			editarColuna.innerHTML = '<button class="btn-default" onClick="editarProduto('+ produto.id +')">Editar</button>';
			
		})
	}).catch(error => console.error(error))
}

function editarProduto(id){
	fetch('http://localhost:8000/api/produtos/' + id, {
		headers: {'content-type': 'application/json'},
	})
	.then(response => response.json())				
	.then(data => { 			
		data = Object(data);
		var form = document.getElementById('editarProduto');
		form.id.value = id;
		form.nome.value = data[0].nome;
		form.marca.value = data[0].marca;
		form.quantidade.value = data[0].quantidade;
		form.validade.value = data[0].validade;
		form.preco.value = data[0].preco;
		document.getElementById('editarDivProduto').style.display="block";

	}).catch(error => console.error(error))	
}

function removerProduto(id){	
	fetch('http://localhost:8000/api/produtos/' + id, {
		method: 'DELETE',
		headers: {'content-type': 'application/json'},
		body: JSON.stringify(id)   		
	})
	.then((response) => {
		console.log(response);
		if (response.ok) {
			alert("Excluído com sucesso!");
			window.location.reload(); 
			return response.json() 
		} else {
			alert("Ocorreu algum erro na exclusão. Tente novamente.");
			return Promise.reject({ status: res.status, statusText: res.statusText });
		}
	})
	.then((data) => console.log(data))
	.catch(err => console.log('Error message:', err.statusText));
}

function adicionarProduto(){
	document.getElementById('formProduto').style.display="block";
}

function enviarForm() {
	var form = document.getElementById('adicionarProduto');
	var data = {};
	data['nome'] = form.nome.value 
	data['marca'] = form.marca.value;
	data['quantidade'] = form.quantidade.value;
	data['validade'] = form.validade.value; 
	data['preco'] = form.preco.value;
	console.log(JSON.stringify(data));
	fetch('http://localhost:8000/api/produtos', {
		headers: { 'Content-Type': 'application/json'},
		method: 'POST',       
		body: JSON.stringify(data)
	})
	.then((response) => {
		console.log(response);
		if (response.ok) {
			alert("Cadastrado com sucesso!");
			window.location.reload();
			return response.json() 
		} else {
			alert("Ocorreu algum erro no cadastro. Tente novamente.");
			return Promise.reject({ status: res.status, statusText: res.statusText });
		}
	})
	.then((data) => console.log(data))
	.catch(err => console.log('Error message:', err.statusText));
}

function enviarFormEditar() {
	var form = document.getElementById('editarProduto');
	var data = {};
	data['nome'] = form.nome.value 
	data['marca'] = form.marca.value;
	data['quantidade'] = form.quantidade.value;
	data['validade'] = form.validade.value; 
	data['preco'] = form.preco.value;
	console.log(JSON.stringify(data));
	fetch('http://localhost:8000/api/produtos/'+ form.id.value, {
		headers: { 'Content-Type': 'application/json'},
		method: 'PUT',       
		body: JSON.stringify(data)
	})
	.then((response) => {
		console.log(response);
		if (response.ok) {
			alert("Atualizado com sucesso!");
			window.location.reload();
			return response.json() 
		} else {
			alert("Ocorreu algum erro na atualização. Tente novamente.");
			return Promise.reject({ status: res.status, statusText: res.statusText });
		}
	})
	.then((data) => console.log(data))
	.catch(err => console.log('Error message:', err.statusText));
}
