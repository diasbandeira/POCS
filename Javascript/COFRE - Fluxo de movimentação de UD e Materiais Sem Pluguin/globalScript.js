var i = 0;
var l = 0;
var contadorMovimentacao = 0;
var Contador = 0;
var qtdeMaterialCaixaRep = 0;
var qtdMateriaisCaixasLidas = 0;
var ListaRegistrosLidos = [] ;
var PosicaoArrayLido = -1;
var Acao = "";
var mensagem = "";
var vMaterialCaixa = "";
var LeituraFinal = "";
var cLocalizacao= "";
var rota = "";
var TipoLeitura ="";
var vMaterialColetados;
var listColunasCodigoCaixaRep = [];
var listaColunas = [];
var listaDadosLidos = [];
var listaColunasDadosLidos = [];
var CodigoUD = "";
var CodigoMaterial = "";
var LocalizacaoOrigem = "";
var LocalizacaoDestino ="";
var Quantidade="";
var LeituraTerminada = false;
var PreencheItensLidos = true;
function removeLineBreaks(str){
  return str.replace("\\n", "").replace("\\t", "");
}
function DadosColetados(){
    var itens = 0;
    var colunas = 0;
    mensagem = "";
    pbLib.setVarValue("vMaterialCaixa", mensagem );
    while( itens < qtdMateriaisCaixasLidas){
        listaColunasDadosLidos= listaDadosLidos[itens].split(";");
        colunas  = listaColunasDadosLidos.length;
        mensagem = pbLib.getVarValue("vMaterialCaixa");
        if (listaColunasDadosLidos[0] !== "" && ListaRegistrosLidos[ itens ] === 0){
            if( listaColunasDadosLidos[1] === ""   ){
                mensagem = mensagem + "<b> Mat: "+ listaColunasDadosLidos[0] + " Cx: " + listaColunasDadosLidos[2]  + " Caixa Fechada </b><br/>";
            }else{
                mensagem = mensagem + "<b> Mat: "+ listaColunasDadosLidos[0] + " Lc: " + listaColunasDadosLidos[1]  + " Caixa Aberta  </b><br/>";
            }
            pbLib.setVarValue("vMaterialCaixa",mensagem);
        }
        itens = itens + 1;
    }
}
function identificaLocalizacao(codigolocalizacao){
  if (codigolocalizacao.substring(4,1 ) === "-" && codigolocalizacao.substring(7,1 ) === "-"){
    return true;
  }else{
    return false;
  }
}