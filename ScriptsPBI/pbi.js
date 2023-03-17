const process = (object) =>{

if (!object || object.status !== 2)
return [];

var cliente = 'getOffice()';
var pdv = 'getCustomer()';
var promotor = 'getUser()';

if (!cliente || !pdv)
return [];

var OUTPUT = { }; 
var visita = object.code;
var finished = object.finishedAt;
var produto = '';
var promotor = promotor.Name;
var rede = (object.variables || {}).vRedeVisitada;
var cliente = cliente.Name;
var pdv = pdv.Name;
var codigo = '';

for(var transitionIndex in object.transitions) {
var transition = object.transitions[transitionIndex];
  if (!transition.variables || transition.status != 3) 
    continue;

  var dataHora = transition.executedAt;

  //produto = transition.variables.vProdutoPreco;
  
  produto = transition.variables.vProdutos;
  if (produto) {
    console.log('1');
    codigo = transition.executedAt + produto;
    OUTPUT[codigo] = OUTPUT[codigo] || { codigo: codigo, visita: visita, produto: produto, rede: rede, cliente: cliente, periodo: dataHora, pdv: pdv, promotor: promotor, finished: finished };

  } else if (codigo && transition.variables.vPrecoAtacado && !transition.variables.vPrecoVarejo) {
    console.log('2');
    OUTPUT[codigo].precoAtacado = transition.variables.vPrecoAtacado;

  } else if (codigo && transition.variables.vPrecoVarejo && !transition.variables.vPrecoAtacado) {
    console.log('3');
    OUTPUT[codigo].precoVarejo = transition.variables.vPrecoVarejo;

  } else if (codigo && transition.variables.vTipoProduto) {
    console.log('4');
    OUTPUT[codigo].tipoProduto = transition.variables.tipoProduto;
  }else if(codigo && transition.variables.vPrecoVarejo && transition.variables.vPrecoAtacado){
    console.log('5');
    OUTPUT[codigo].precoVarejo = transition.variables.vPrecoVarejo;
    OUTPUT[codigo].precoAtacado = transition.variables.vPrecoAtacado;
  }

}

return Object.keys(OUTPUT).map(function(key) { 
    console.log(OUTPUT[key]);
    return OUTPUT[key]; 

});

}
process(object);