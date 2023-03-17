console.log("Separar pedido");
var TipoLeitura = ""; 
var lerproximo = true;
if (FezSincronizacao){
  pbLib.setVarValue("vCodigoMaterial","");    
  LeituraFinal = "";
  codigoMaterialCaixa = "";
  quantidade = 0 ;
  CodigoCaixa  = "";
  FezSincronizacao = false;
}
codigoMaterialColetado = pbLib.getVarValue("codigoMaterial");

rota = "LeituraInvalida";
rota = separarPedido(codigoMaterialColetado);
TipoLeitura = identificaCaixaMaterial(codigoMaterialColetado);
if(rota === "Invalida" ){
  pbLib.setVarValue("vCodigoInvalido",MTMensagem);
  lerproximo = false;
}
if(rota === "Finalizado" && TipoLeitura === "Caixa"  && lerproximo){
  pbLib.setVarValue("vCodigoMaterial",LeituraFinal);
  LeituraFinal = "";
  codigoMaterialCaixa = "";
  quantidade = 0 ;
  CodigoCaixa  = "";
  lerproximo = false;
  AcabouLeitura = true;
}

if(rota === "Finalizado" && TipoLeitura === "Material" && lerproximo){
  atualizaMensagemLocalizacao();
  rota = "Localizacao2";
}else{
  pbLib.setVarValue("Acao", "01");
}
if(rota === "Continuar" || rota === "Localizacao2") {
  if(TipoLeitura === "Material"){
    if( PosicaoItemRepetido === posicaoNasListas ){
      if(rota === "Continuar"){
        var material = pbLib.getVarValue("vCodigoMaterial");
        if (material.length > TamanhoMaximoString){
          rota = "Sincronizar01";
        }else{
          rota = "Continuar 2";
        }
      }else{
        rota = "Continuar 3";
        pbLib.setVarValue("cLocalizacao2", pbLib.getVarValue("cLocalizacao"));
      }
    }else{
      vMaterialAnterior = codigoMaterialColetado;
      PosicaoItemRepetido = PosicaoMaterial;
      ZerouLocalizacao = false;
    }
  }
}
console.log("FIM Separar pedido - rota: ", rota);
pbLib.goToRoute(rota);