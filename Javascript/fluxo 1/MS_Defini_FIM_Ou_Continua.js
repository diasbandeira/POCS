if(pbLib.getVarValue("vOcorrencia") === "Sim"){
    AcabouLeitura = true;
}
if(AcabouLeitura ){
    pbLib.goToRoute("Finaliza");
}else{
  FezSincronizacao = true;
  pbLib.goToRoute("Sincroniza");
 }