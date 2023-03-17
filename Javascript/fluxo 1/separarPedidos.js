// Tipo leitura
string TipoLeitura = ""; 
boolean lerproximo = true;
//
if (FezSincronizacao)
{
  setVarValue("vCodigoMaterial","");    
  LeituraFinal = "";
  codigoMaterialCaixa = "";
  quantidade = 0 ;
  CodigoCaixa  = "";
  FezSincronizacao = false;
}

// obtem o código digitado
codigoMaterialColetado = getVarValue("codigoMaterial");

// Rota padrão
rota = "LeituraInvalida";
 
//showDialog("Rota antes", rota);
// chama a função separarPedido (GlobalScript) passando o codigo por parâmetro
rota = separarPedido(codigoMaterialColetado);
TipoLeitura = identificaCaixaMaterial(codigoMaterialColetado);
if (rota == "Invalida" ){               
    setVarValue("vCodigoInvalido",MTMensagem);
    lerproximo = false;  
}
if(rota == "Finalizado" && TipoLeitura == "Caixa"  && lerproximo){
  setVarValue("vCodigoMaterial",LeituraFinal);
  LeituraFinal = "";
  codigoMaterialCaixa = "";
  quantidade = 0 ;
  CodigoCaixa  = "";
  lerproximo = false;
  AcabouLeitura = true;
}
if(rota == "Finalizado" && TipoLeitura == "Material" && lerproximo){
    atualizaMensagemLocalizacao();
    rota = "Localizacao2"; 
}else{
    setVarValue("Acao", "01");
}
if(rota == "Continuar" || rota == "Localizacao2") {
    if(TipoLeitura == "Material"){
        if( PosicaoItemRepetido == posicaoNasListas ){
           if(rota == "Continuar"){
                if (strlen(getVarValue("vCodigoMaterial")) > TamanhoMaximoString){
                    rota = "Sincronizar01"; 
                }else{
                    rota = "Continuar 2";
                } 
            }else{
                rota = "Continuar 3";
                setVarValue("cLocalizacao2", getVarValue("cLocalizacao"));
            }
        }else{
            vMaterialAnterior = codigoMaterialColetado;
            PosicaoItemRepetido = PosicaoMaterial;
            ZerouLocalizaçcao = false;
        }
    }
}

goToRoute(rota);