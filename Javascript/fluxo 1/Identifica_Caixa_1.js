console.log("Identifica caixa 1");
var RotaCaixa = identificaCaixaMaterial(pbLib.getVarValue("codigoMaterial"));
if(RotaCaixa === "Caixa"){
   pbLib.setVarValue("vCodigoMaterial",LeituraFinal);
    if (pbLib.getVarValue("vCodigoMaterial").length > TamanhoMaximoString){
        pbLib.showDialog("Envio de Dados","É necessário o envio dos dados para o Servidor agora. Após a sincronização continue a separação do pedido.");
        RotaCaixa = "SincronizarCX";
    }
    pbLib.setVarValue("cLocalizacao", "");
    pbLib.setVarValue("cLocalizacao2", "");
    LeituraFinal = "";
    codigoMaterialCaixa = "";
    quantidade = 0;
    CodigoCaixa = "";
}else{
    atualizaMensagemLocalizacao();
}
console.log("RotaCaixa: ", RotaCaixa);
pbLib.goToRoute(RotaCaixa);