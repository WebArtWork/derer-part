var derer  = require('derer');
module.exports = function(sd){
	sd.derer = derer;
	var dererOpts = {
		varControls: ['{{{', '}}}']
	}
	if(!sd.config.production){
		dererOpts.cache = false;
	}
	derer.setDefaults(dererOpts);
	sd.app.engine('html', derer.renderFile);
	sd.app.set('view engine', 'html');
	sd.app.set('view cache', true);
	derer.setFilter('string',function(input){
		return input&&input.toString()||'';
	});		
	derer.setFilter('fixlink',function(link){
		if(link.indexOf('//')>0) return link;
		else return 'http://'+link;
	});
	// derer.setFilter('tr', sd._tr);
	// derer.setFilter('translate', sd._tr);
	sd._derer = derer;
}