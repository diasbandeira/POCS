var checkLocalizacao = 0;
var quantidadeLocalizacao = 0;
var y = 0;
var mensagem01 = "";
var LocalValido = true ;
var rotaLocalizacao = "LocNOk";
var CodigoLocaliza = removeLineBreaks(pbLib.getVarValue("cLocalizacao"));
var localizacaoEspecial = codigoMaterialColetado + CodigoLocaliza;
LocalValido = true ;
if (CodigoLocaliza === "9999"){
   LocalValido = false;
   rotaLocalizacao = "OcorrenciaLocalizacao";
}
if (LocalValido ){
    if(CodigoLocaliza !== 9){
        pbLib.showDialog("Atenção","Código <"+ CodigoLocaliza +"> para Localização está incorreta.");
        localizacaoEspecial = "";
        LocalValido = false;
        rotaLocalizacao  = "LocNOk";
    }
}
if(CodigoLocaliza === "" && LocalValido){
    pbLib.showDialog("Atenção","Código da localização não pode ser BRANCO.");
    localizacaoEspecial = "";
    LocalValido = false;
    rotaLocalizacao  = "LocNOk";
}
if (LocalDefinido  !== CodigoLocaliza  && LocalValido){
    pbLib.showDialog("Atenção","Localização esperada ("+LocalDefinido +") diferente da localização Lida ("+CodigoLocaliza+ ").");
    LocalValido = false;
    rotaLocalizacao  = "LocNOk";
    atualizaMensagemLocalizacao();
    if(LocalValido){
        mensagem = "";
        checkLocalizacao = listaMaterialLocal.indexOf(localizacaoEspecial);
        if(checkLocalizacao > -1){
            if(codigoMaterialColetado.substring(codigoMaterialColetado.length -5, codigoMaterialColetado.length) === "CANao"){
                codigoMaterialColetado = codigoMaterialColetado.substring(codigoMaterialColetado.length -5);
            }
            LeituraFinal = pbLib.getVarValue("vCodigoMaterial") + codigoMaterialColetado + ";" + removeLineBreaks(pbLib.getVarValue("cLocalizacao"))  + ";;" + "01;"+ PosNR +"|";
            pbLib.setVarValue("vCodigoMaterial",LeituraFinal);
            if(ZerouLocalizaçcao){
                listaMaterialLocal[checkLocalizacao] = "Lido";
            }
            codigoMaterialColetado="";
            if (pbLib.getVarValue("vCodigoMaterial").length> TamanhoMaximoString ){
                pbLib.showDialog("Envio de Dados","É necessário o envio dos dados para o Servidor agora. Após a sincronização continue a separação do pedido.");
                rotaLocalizacao = "SincronizaLoc01";
                AcabouLeitura = false;
            }else{
                rotaLocalizacao = "LocOk";
            }
        }else{
            if (codigoMaterialColetado.substring( codigoMaterialColetado.length -5, codigoMaterialColetado.length ) === "CANao"){
                mensagem01 = codigoMaterialColetado.substring(0,codigoMaterialColetado.length -5);
            }
            mensagem01 = mensagem01 + " - " + removeLineBreaks(pbLib.getVarValue("cLocalizacao"));
            pbLib.showDialog("Atenção!","Localização inválida! " + mensagem01);
            localizacaoEspecial = "";
            rotaLocalizacao = "LocNOk";
        }
    }
}
pbLib.goToRoute(rotaLocalizacao);
