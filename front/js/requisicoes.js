window.onload = function(e) {
	fetch(
		'http://localhost:8000/api/produtos', {		
		}).then(response => response.json())				
	.then(data => { 
		console.log(data);
		data.forEach(produto => {  
			var table = document.getElementById("tabelaprodutos");
			var row = table.insertRow(-1);
			var idColuna = row.insertCell(0);
			var nomeColuna = row.insertCell(1); 
			var marcaColuna = row.insertCell(2); 
			var quantidadeColuna = row.insertCell(3); 
			var validadeColuna = row.insertCell(4); 
			var precoColuna = row.insertCell(5); 
			idColuna.innerHTML = produto.id;
			nomeColuna.innerHTML = produto.nome;
			marcaColuna.innerHTML = produto.marca;
			quantidadeColuna.innerHTML = produto.quantidade;
			validadeColuna.innerHTML = produto.validade;
			precoColuna.innerHTML = produto.preco;
		})
	}).catch(error => console.error(error))
}

function adicionarProduto(){
	document.getElementById('formProduto').style.display="block"
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
		method: 'POST',       
		body: JSON.stringify(data)
	})
	.then((response) => {
		if (response.ok) {
			return response.json() 
		} else {
			return Promise.reject({ status: res.status, statusText: res.statusText });
		}   

	})
	.then((data) => console.log(data))
	.catch(err => console.log('Error message:', err.statusText));
}
