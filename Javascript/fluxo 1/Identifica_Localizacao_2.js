var checkLocalizacao1 = 0;
var quantidadeLocalizacao1 = 0;
var mensagem02 = "";
var LocalValido1 = true;
var CodigoLocaliza1 = removeLineBreaks(pbLib.getVarValue("cLocalizacao2"));
var rotaLocalizacao1 = "";
var localizacaoEspecial1 = codigoMaterialColetado + removeLineBreaks(pbLib.getVarValue("cLocalizacao2"));
rotaLocalizacao1 = "Loc2NOK";
if(CodigoLocaliza1.length !== 9 && LocalValido1){
    pbLib.showDialog("Atenção","O Código <"+ CodigoLocaliza1 +"> para Localização está incorreto.");
    localizacaoEspecial1 = "";
    LocalValido1 = false;
    rotaLocalizacao1 = "Loc2NOK";
}
if(CodigoLocaliza1 === "" && LocalValido1){
    pbLib.showDialog("Atenção","Código da localização não pode ser BRANCO.");
    localizacaoEspecial1 = "";
    atualizaMensagemLocalizacao();
    LocalValido1 = false;
    rotaLocalizacao1 = "Loc2NOK";
}
if(LocalValido1){
    mensagem = "";
    localizacaoEspecial1 = localizacaoEspecial1;
    checkLocalizacao1 = listaMaterialLocal.indexOf(localizacaoEspecial1);
    if(checkLocalizacao1 != -1){
        rotaLocalizacao1 = "LeituraOK";
        if (codigoMaterialColetado.substring(codigoMaterialColetado.length -5, codigoMaterialColetado.length) == "CANao"){
            codigoMaterialColetado = codigoMaterialColetado.substring(0,codigoMaterialColetado.length -5);
        }
        LeituraFinal = pbLib.getVarValue("vCodigoMaterial") + codigoMaterialColetado + ";" + removeLineBreaks(pbLib.getVarValue("cLocalizacao2"))  + ";;" + "01;"+ PosNR +"|";
        pbLib.setVarValue("vCodigoMaterial",LeituraFinal);
        codigoMaterialColetado="";
        AcabouLeitura = true;
        pbLib.setVarValue("Acao", "01");
    }else{
        if(codigoMaterialColetado.substring(codigoMaterialColetado.length -5, codigoMaterialColetado.length ) == "CANao"){
            mensagem02 = codigoMaterialColetado.substring(0, codigoMaterialColetado.length -5);
        }
        mensagem02 = mensagem02 + " - " +  removeLineBreaks(pbLib.getVarValue("cLocalizacao2"));
        pbLib.showDialog("Atenção!","Localização inválida! " + mensagem02);
        localizacaoEspecial1  = "";
        rotaLocalizacao1 = "Loc2NOK";
    }
}
pbLib.goToRoute(rotaLocalizacao1);