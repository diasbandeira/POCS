function getResult() {
    var _ = [{
      "codigo": "27f542eb-7c5e-0371-4053-246cee43f1fc",
      "periodo": "20230218071512",
      "visita": "FBPDV-2023-02-107798",
      "finished": "18/02/2023 08:58:20",
      "rede": "SUPERMERCADOS BH",
      "pdv": "BH CAMARGOS - LOJA 128",
      "cliente": "NIVEA",
      "promotor": "MARTA MARIA DE CASTRO",
      "produto": "CREME NIVEA LATA 56G MSL - CI:45627",
      "tipoOcorrencia": "Vencimento menor que 90 dias",
      "quantidade": "25",
      "vencimento": "28/02/2023",
      "precoVarejo": "",
      "precoAtacado": "",
      "local": "",
      "acao": ""
  }];
    _.run = function() {
        


function getData($this, filters) {
  var periodos = {};
  var headers  = ['ID', 'DATA', 'CLIENTE', 'PROMOTOR', 'REDE', 'LOJA', 'CNPJ', 'PRODUTO', 'QDTE', 'VENC', 'OCORRÊNCIA', 'LOCAL', 'AÇÃO', 'PRECO ATACADO', 'PRECO VAREJO'];
  var grouper = {};

  var dtInit = new Date(new Date(filters.StartDate).getTime()).getTime();
  var dtEnd  = new Date(new Date(filters.StartDate).getTime()+ (90*24*60*60*1000)).getTime();   
  
  console.log(dtInit)
  console.log(dtEnd)

  $this.forEach(function(kpi) {
    if(filters['data'] === undefined || filters['data'] === kpi.produto){

      if(kpi.vencimento !== ''){
        var date = kpi.vencimento.split('/');
        var dd   = date[0];
        var MM   = date[1];
        var yyyy = date[2].substring(0,4);
        var vencimento = new Date(yyyy, parseInt(MM)-1, dd).getTime();

    
        if(dtInit < vencimento && dtEnd > vencimento){

          if(Object.keys(grouper).length === 0){
            grouper.details = {};
          }

          var key = kpi.pdv +'-'+ kpi.produto +'-'+ vencimento;

          if(!grouper[key] || grouper[key].vencimento < vencimento){
            grouper[key] = { vencimento: vencimento, kpi: kpi }; 
          }

          var detail = [kpi._id, kpi._ref, kpi.cliente, kpi.promotor, kpi.rede, kpi.pdv, kpi.cnpjPDV, kpi.produto, kpi.quantidade, kpi.vencimento, kpi.tipoOcorrencia, kpi.local, kpi.acao, kpi.precoAtacado, kpi.precoVarejo];
                
          if(grouper.details[vencimento]){
            grouper.details[vencimento].push(detail);

          }else{
            grouper.details[vencimento] = [detail];
          }

        }

      }
    }
	});


  
  Object.keys(grouper).forEach(function(item) { 
    if(item !== 'details'){
      var group = grouper[item];
      var key = group.vencimento;
      var kpi = group.kpi;
      
      var periodo = periodos[key] || { 
        name: kpi.vencimento,
        quantidade: 0,
        details: grouper.details[key],
        sort: key 
      };
      
      if (!!kpi.quantidade.trim()) {
        periodo.quantidade += parseInt(kpi.quantidade);
      }
      periodos[key] = periodo;
    }
  });


	var items = Object.keys(periodos).map(function(key) { return periodos[key]; }).sort(function (o1, o2) { return o1.sort - o2.sort; });

	var labels = [];
	var series = ['Quantidade'];
	var config = [];
	var data = [];
	var colors = ['#e84444'];
  var details = [];

		
	for(var index in items) {
		console.log('items: ', items);
		console.log('index: ', index);
		var periodo = items[index];
		labels.push(periodo.name);
		config.push({ color : colors[0], display: true, id: index, position: 'left', type: 'linear' });
		data.push(periodo.quantidade);
    details.push([periodo.details]);
	}
	
	return {
		config: config,
		data: data,
		labels: labels,
		series: series,
		headers: headers,
		details: details,
		colors: colors
	};
}

var chart = 'getChart()';
var params = 'getParams()';

var filter = {
    DimensionTime: 1,
    EndDate: '03/30/2023 11:59:59 PM -03:00',
    PeriodType: 'Personal',
    Product: '',
    StartDate: '01/01/2023 11:59:59 PM -03:00',
    //Tags: 'MART MINAS MONTE CARMELO - LOJA 249',
    //Tags: 'MART MINAS ATACADO E VAREJO',
}
console.log('filter: ', filter);
var data = getData(this, filter);

console.log({
	id: chart.Id,
	name: chart.Name,
	perspective: 'ExecutedAt',
	title: chart.Title,
	description: 'Indicador de Data Crítica',
	type: 'Line',
	data: data,
	colors: data.colors,
	options: {
        scales: {
            yAxes: [{
                stacked: true
            }]
        }
    }});

return {
	id: chart.Id,
	name: chart.Name,
	perspective: 'ExecutedAt',
	title: chart.Title,
	description: 'Indicador de Data Crítica',
	type: 'Line',
	data: data,
	colors: data.colors,
	options: {
        scales: {
            yAxes: [{
                stacked: true
            }]
        }
    }
};



    }
    return _.run();
}
getResult();