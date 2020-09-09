var MenuController = function() {
    
	// DEFAULT PARAMETERS, VAR, CONSTS. 
    var APPNAME = 'Onesait Metro'; 
	var LIB_TITLE = 'Menu Controller';	
    var logControl = 0;
	var LANGUAGE = ['en'];
	var currentLanguage = ''; // loaded from template.
	var host = window.location.hostname || 'lab.onesaitplatform.com'; 
	
	// CONTROLLER PRIVATE FUNCTIONS
	
		
	// LOAD MENU INFORMATION FROM USER-ROLE 
	// get JSON from HTML -> 
	
	var dashboardFn = function(obj){
		dashboardFunctionStr = '';		
		dashboardFunctionStr = 'onclick="FrontendController.loadDashboard(\''+ obj.src +'\',\''+ obj.title +'\',\''+ obj.background +'\',\''+ obj.height +'\',\''+ obj.mode +'\')"';
		return dashboardFunctionStr;
	}
	
	
	var consoleMenu = function(){
		
		logControl ? console.log('|---> consoleMenu() -> Creating HTML Console Menu') : '';
		
		var menu_HTML	= ''
		,submenu_HTML	= ''
		,markUp_HTML	= ''
		,home_HTML		= ''
		,page_LANG 		= ''
		,menu_LANG 		= ''
		,heading		= ''
		,icon			= 'flaticon-more-v2'
		,submenus 		= false;
		
		// NO-DATA NO-FUN!
		if (!menuReg){ $.alert({title: 'MENU ERROR!',content: 'No Menu Data!'}); return false; }
		
		// GET JSON FROM CONTROLLER LOAD()
		var menuJson = menuReg;
		
		// check for user configuration loaded on login, if exist change configuration on the fly
		var userMenu = sessionStorage.getItem("userMenu");
		
		if ( userMenu !== null ) {  menuJson = JSON.parse(sessionStorage.getItem("userMenu")); console.log('Menu Configuration updated on the fly'); }
		
		// GET CURRENT LANGUAGE OR 'ES'.
		page_LANG = currentLanguage || LANGUAGE;
		menu_LANG = page_LANG.toString().toUpperCase();
		
		logControl ? console.log('     |---> menu: ' + menuJson.menu + ' NoSession Path: ' + menuJson.noSession + ' Rol: ' + menuJson.rol + ' Navigation Objects: ' + menuJson.navigation.length + ' Language: ' + menu_LANG ) : '';
		
		// CLEAR PREVIOUS MENUS
		$('#app-asideMenu').children().remove();
		
		// SHOW OR NOT HOME MENU ITEM: 
		if ( menuJson.home ) {
			home_HTML =  '<li class="m-menu__item start" aria-haspopup="true" m-menu-link-redirect="1">' 
							+'	<a href="index.html" data-src="https://' + host + '/controlpanel/dashboards/viewiframe/d8ed5dfd-22d0-4656-8d8c-ba8bb620ee2f" class="m-menu__link "><i class="m-menu__link-icon flaticon-dashboard"></i><span class="m-menu__link-text">Home</span></a>'
							+'</li>';
			markUp_HTML += home_HTML;
		}
		// NAV-ITEM MAIN LOOP
		var navItemsArr = menuJson.navigation;
		let dash = '';
		
		navItemsArr.map(function(item, index){
			
			// CLEAN VARS FOR EACH LOOP.
			menu_HTML = submenu_HTML = '';			
			logControl ? console.log('     |---> navItem-' + index + 'Item: ' + item.title.ES + ';  Submenus: ' + item.submenu.length + ' ' + submenus ) : '';
			
			if ( hasSubmenus(item) ){
				submenus = true;										
				menu_HTML	+= '<li class="m-menu__item m-menu__item--submenu m-menu__item--bottom-1" aria-haspopup="true" m-menu-submenu-toggle="hover">'
							 + '<a href="javascript:;" class="m-menu__link m-menu__toggle"><i class="m-menu__link-icon '+ item.icon +'"></i><span class="m-menu__link-text">'+ item.title[ menu_LANG ] +'</span><i class="m-menu__ver-arrow la la-angle-right"></i></a>'
							 + '<div class="m-menu__submenu m-menu__submenu--up" style="">'
							 + '<span class="m-menu__arrow"></span>'
							 + '<ul class="m-menu__subnav">';
							
				
				// SUB-NAV-ITEM LOOP
				item.submenu.map(function(subitem, subindex){					
					if (subitem.url !== ''){
					submenu_HTML   +='<li class="m-menu__item " aria-haspopup="true" m-menu-link-redirect="1">'
									+'<a href="'+ subitem.url +'" class="m-menu__link "><i class="m-menu__link-bullet m-menu__link-bullet--dot"><span></span></i><span class="m-menu__link-text">'+ subitem.title[ menu_LANG ] +'</span></a>'
									+'</li>';
					}
					else if (!jQuery.isEmptyObject(subitem.dashboard)){
						dash = dashboardFn(subitem.dashboard);
						submenu_HTML   +='<li class="m-menu__item " aria-haspopup="true" m-menu-link-redirect="1">'
									+'<a href="#" '+ dash +' data-src="'+ subitem.dashboard.src +'" id="m-menu-item'+ index +'-'+ subindex +'" class="m-menu__link "><i class="m-menu__link-bullet m-menu__link-bullet--dot"><span></span></i><span class="m-menu__link-text">'+ subitem.title[ menu_LANG ] +'</span></a>'
									+'</li>';
					}
					logControl ? console.log('     |---> sub navItem-'+ subindex + '; SubItem: ' + subitem.title[ menu_LANG ] + '.') : '';
							
				});
				// add submenus and close submenu ul of nav-item.
				menu_HTML += submenu_HTML + '	</ul></div>' + '</li>';
				
				// ADD TO FINAL MARKUP
				markUp_HTML += menu_HTML;
				
			}
			else {
				// NAV-ITEM WITHOUT SUBMENU
				submenus = false;
				// CHECK FOR SEPARATOR -> MENU WITHOUT SUBMENUS AND NULL LINK
				if (item.url === '' && jQuery.isEmptyObject(item.dashboard)){
					icon = item.icon !== '' ? item.icon : icon; 
					menu_HTML  +='<li class="m-menu__section ">'
								+'<h4 class="m-menu__section-text">' + item.title[ menu_LANG ] + '</h4>'
								+'<i class="m-menu__section-icon '+ icon +'"></i>'
								+'</li>';
				}
				else{
					// NEW FUNCTIONALITY TO MAKE LINK OR TO LOAD DASHBOARD ON SRC.
					if (item.url !== ''){ 
						menu_HTML	+='<li class="m-menu__item " aria-haspopup="true" m-menu-link-redirect="1">'
									+'<a href="'+ item.url +'" class="m-menu__link "><i class="m-menu__link-icon '+ item.icon +'"></i><span class="m-menu__link-text">'+ item.title[ menu_LANG ] +'</span></a>'
									+'</li>';
					}
					else if (!jQuery.isEmptyObject(item.dashboard)){
						// new to load DASHBOARD no to link page.
						dash = dashboardFn(item.dashboard);
						menu_HTML	+='<li class="m-menu__item " aria-haspopup="true" m-menu-link-redirect="1">'
									+'<a href="#" '+ dash +' data-src="'+ item.dashboard.src +'" id="m-menu-item'+ index +'" class="m-menu__link "><i class="m-menu__link-icon '+ item.icon +'"></i><span class="m-menu__link-text">'+ item.title[ menu_LANG ] +'</span></a>'
									+'</li>';
					}
				}
				
				// ADD TO MARKUP				
				markUp_HTML += menu_HTML;		 
								
			}			
		});
		// ADD MENU 
		$(markUp_HTML).appendTo($('#app-asideMenu'));		  
		// SET ACTIVE NAV. valid only for pages, not for SPA (single page applications).
		//setActiveNavItem();
		
		// CONFIGURATION SESSION MENU 
		sessionStorage.setItem('menu',JSON.stringify(menuJson));
		
	}
	
	// AUX. CHECK IF A NAV-ITEM HAD SUBMENU ITEMS
	var hasSubmenus = function(item){ 
		var checkSubmenus = item.submenu.length > 0 ? true : false;
		return checkSubmenus;  
	}
	
	// AUX. GET CURRENT PAGE URL AND DETECT ACTIVE NAV-ITEM 
	var setActiveNavItem = function(){
		
		logControl ? console.log('|---> setActiveNavItem() -> Setting current nav-item Active') : '';
		
		var templ = top.location.pathname ? top.location.pathname : window.location.pathname;
		var page = templ.split("/").pop();		
		logControl ? console.log('|---> CURRENT PAGE: ' +  page) : '';
		
		// CHECK FIRST NAV (HOME) EXCEP.
		firstMenu = $('#app-asideMenu > li.m-menu__item.start > a.m-menu__link');	
		
		if ( page === 'index.html'){ firstMenu.closest('li.m-menu__item').addClass('m-menu__item--active'); return false;} else { firstMenu.closest('li.m-menu__item').removeClass('m-menu__item--active');}
		
		// GET ALL NAVS, THEN CHECK URL vs. CURRENT PAGE --> ACTIVE.
		var allMenus = $('#app-asideMenu > li.m-menu__item > div.m-menu__submenu > ul.m-menu__subnav  > li.m-menu__item > a.m-menu__link');
		allMenus.each(function(ilink,navlink){
				
			logControl ? console.log('|---> nav-link-' + ilink + ' URL: ' + navlink + ' PAGE: ' + $(this)[0].pathname) : '';
			
			if ( currentPath === $(this)[0].pathname ){					
				currentLi = $(this).closest('li.m-menu__item');
				currentNav = currentLi.parents('.m-menu__item');
				
				// APPLY ACTIVE CLASSES
				currentLi.addClass('m-menu__item--open');							
				currentNav.addClass('m-menu__item--active');
				currentNav.find('.arrow').addClass('open');
				return false;				
			}			
		});		
	}
	
	// MOUNT TREEJS FROM MENU FOR SESSION CONFIGURATION
	var sessionMenu = function(type){
		
		var menu_HTML	= ''
		,submenu_HTML	= ''
		,markUp_HTML	= ''
		,page_LANG 		= ''
		,menu_LANG 		= ''
		,heading		= ''
		,icon			= 'flaticon-more-v3'
		,submenus 		= false;
		
		var isFromSession = type === 'session' ? true : false;
		
		
		logControl ? console.log('|---> sessionMenu() -> Creating HTML Console Menu for session configuration') : '';
		
		// NO-DATA NO-FUN!
		if (!menuReg){ $.alert({title: 'MENU ERROR!',content: 'No Menu Data!'}); return false; }
		
		// GET JSON FROM CONTROLLER LOAD() OR FROM SESSION (configuration menu)
		if (isFromSession) {
			var menuJson = JSON.parse(sessionStorage.getItem('menu'));						
		}
		else { var menuJson = menuReg; }
		
		
		// GET CURRENT LANGUAGE OR 'ES'.
		page_LANG = currentLanguage || LANGUAGE;
		menu_LANG = page_LANG.toString().toUpperCase();
		
		var data = [];
		var elem = {};
		
		// NAV-ITEM MAIN LOOP
		var navItemsArr = menuJson.navigation;
		let dash = '';
		
		// adding Home if exist
		if ( menuJson.home ) { data.push({text:"Home",icon: "flaticon-file", parent: "#"}) }
		
		navItemsArr.map(function(item, index){
			
			// CLEAN VARS FOR EACH LOOP.						
			logControl ? console.log('     |---> navItem-' + index + 'Item: ' + item.title.ES + ';  Submenus: ' + item.submenu.length + ' ' + submenus ) : '';
			
			if ( hasSubmenus(item) ){
				submenus = true;
				elem = {};
				elem.text = item.title[ menu_LANG ];
				elem.id = item.title[ menu_LANG ];
				elem.icon = item.icon;
				elem.children = [];
				elem.data = { title: elem.text, menu: true};
				
				// SUB-NAV-ITEM LOOP
				item.submenu.map(function(subitem, subindex){
					console.log('SI: ' + subitem.title[ menu_LANG ] + ' url: ' + subitem.url + ' dash: ' + jQuery.isEmptyObject(subitem.dashboard));
					if (subitem.url !== ''){
						elem.children.push({ text: subitem.title[ menu_LANG ], id: subitem.title[ menu_LANG ], icon: subitem.icon || "flaticon-file", data: { title: subitem.title[ menu_LANG ], url:subitem.url} });
					}
					else if (!jQuery.isEmptyObject(subitem.dashboard)){
						elem.children.push({ text: subitem.title[ menu_LANG ], id: subitem.title[ menu_LANG ], icon: subitem.icon || "flaticon-dashboard", data: { title: subitem.title[ menu_LANG ], dashboard:{src:subitem.dashboard.src ,title: subitem.dashboard.title, background: subitem.dashboard.background, height: subitem.dashboard.height, mode: subitem.dashboard.mode}}});					
						logControl ? console.log('     |---> sub dashboard navItem-'+ subindex + '; dashboard: ' + JSON.stringify(elem) ) : '';
					}					
					logControl ? console.log('     |---> sub navItem-'+ subindex + '; SubItem: ' + subitem.title[ menu_LANG ] + '.') : '';							
				});
				data.push(elem);				
			}
			else {
				submenus = false;
				//{text:"Home", icon:"flaticon-dashboard", data:{ additional properties to conf. }},
				elem = {};
				
				if (item.url === '' && jQuery.isEmptyObject(item.dashboard)){
					elem = { text: item.title[ menu_LANG ], id:item.title[ menu_LANG ], icon: '', data: {} };
					data.push(elem);
				}
				else if (item.url !== ''){ 
					elem = { text: item.title[ menu_LANG ], id:item.title[ menu_LANG ], icon: item.icon || "flaticon-file", data: { title: item.title[ menu_LANG ], url:item.url} };
					data.push(elem);
				}
				else if (!jQuery.isEmptyObject(item.dashboard)){
						elem = { text: item.title[ menu_LANG ], id:item.title[ menu_LANG ], icon: item.icon || "flaticon-dashboard", data: { title: item.title[ menu_LANG ], dashboard:{src:item.dashboard.src ,title: item.dashboard.title, background: item.dashboard.background, height: item.dashboard.height, mode: item.dashboard.mode}}};
						data.push(elem);
				}				
			}			
		});

		// adding menu to configuration or refreshing data if session.
		if (isFromSession){
			$('#publicAccessSystem').jstree("deselect_all");
			$('#publicAccessSystem').jstree(true).settings.core.data = data;
			$('#publicAccessSystem').jstree(true).refresh();
		}
		else{
		
			$("#publicAccessSystem").jstree({
				plugins:["types","contextmenu"], //plugins:["wholerow","checkbox","types"],
				core:{
					themes:{responsive:!1},
					"check_callback" : true,
					data: data
				},
				types:{default:{icon:"flaticon-file"},file:{icon:"fa fa-file  m--font-primary"}}
			});		
		}
	};
	
	// UPDATE OR INSERT ITEM MENU FROM TREEJS TO SESSION CONFIGURATION
	var sessionItemMenu = function(type){
		
		let mode 		= '';
		let title 		= '';
		let newtitle	= '';
		let url 		= '';
		let src			= '';
		let background	= '';
		let height		= '';
		var strJson 	= '';
		var parentItem	= '';
		var position	= '';
		var sesMenu 	= JSON.parse(sessionStorage.getItem('menu'));	
		var node 		= {};
		var newnode		= {};
		var submenu		= [];

		if (type === 'update'){
			
			mode  = $('#updateItem-Btn').attr('data-mode');
			title = $('#updateItem-Btn').attr('data-title');
			
			// UPDATE
			if (mode === 'submenu'){
				newtitle	= $('#linkitem-title').val();
				url			= $('#linkitem-url').val();
				
			} else if (mode === 'menu'){
				newtitle = $('#menuitem-title').val();
				
			} else if (mode === 'dashboard'){
				newtitle	= $('#dashboard-title').val();
				src			= $('#dashboard-src').val();
				background	= $('#dashboard-background').val();
				height		= $('#dashboard-height').val();	
			}
			
			logControl ? console.log('|---> updateSessionItemMenu() -> mode: ' + mode + ' title: ' + title + ' new Title: ' + newtitle) : '';
			
			// get same node on menu session and updateCommands						
			node = sesMenu.navigation.find(o => o.title.EN === title || o.title.ES === title);		
			node = node === undefined ? sesMenu.navigation.find(o => o.submenu.length > 0).submenu.find(item => item.title.EN === title || item.title.ES === title) : node;
			
			// updating data
			node.title.EN = newtitle;
			node.title.ES = newtitle;
			
			if (mode === 'submenu'){			
				node.url = url;	
			} else if (mode === 'menu'){			
				
			} else if (mode === 'dashboard'){
				node.dashboard.title 		= newtitle;
				node.dashboard.src			= src;
				node.dashboard.background	= background;
				node.dashboard.height		= height;
			}
		}
		else {
			// INSERT
			mode = $('#insertItem-Btn').attr('data-mode');
			title = $('#menuitem-parent').val(); // parent node can be identifier or # root
			console.log('insertando nuevo nodo...en parent: ' + title);
			
						
			if (mode === 'submenu'){
				newtitle	= $('#linkitem-title').val();
				url			= $('#linkitem-url').val();
				parentItem	= $('#linkitem-parent').val();
				position	= $('#linkitem-position').val();	
				newnode.url = url;
				newnode.title = {"EN":newtitle,"ES":newtitle};
				
				//now get the parent and insert newnode on submenu item.
				if (parentItem === '#'){ 
					node = sesMenu.navigation; 
					position === 'first' ? node.unshift(newnode) :  position === 'last' ? node.push(newnode) : node.splice(position, 0, newnode);
				}
				else {
					parentNode = sesMenu.navigation.find(o => o.title.EN === parentItem || o.title.ES === parentItem);
					// insert on submenu
					position === 'first' ? parentNode.submenu.unshift(newnode) :  position === 'last' ? parentNode.submenu.push(newnode) : parentNode.submenu.splice(position, 0, newnode);
				}				
				
			} else if (mode === 'menu'){
				newtitle	= $('#menuitem-title').val();
				parentItem	= $('#menuitem-parent').val();
				url			= '';
				position	= $('#menuitem-position').val();				
				submenu		= [];
				newnode.url = url;
				newnode.icon = 'flaticon-menu-1';
				newnode.submenu = submenu;
				newnode.title = {"EN":newtitle,"ES":newtitle};				
				
				node = sesMenu.navigation;
				position === 'first' ? node.unshift(newnode) :  position === 'last' ? node.push(newnode) : node.splice(position, 0, newnode);
				
			} else if (mode === 'dashboard'){
				
				newtitle	= $('#dashboard-title').val();
				src			= $('#dashboard-src').val();
				background	= $('#dashboard-background').val();
				height		= $('#dashboard-height').val();
				url			= '';				
				parentItem	= $('#dashboarditem-parent').val();
				position	= $('#dashboarditem-position').val();	
				
				// inserting
				newnode.title = {"EN":newtitle,"ES":newtitle};
				newnode.url = url;
				newnode.dashboard = {"title":newtitle, "src":src, "background": background, "height":height , "mode":'INSERT'};
				
				//now get the parent and insert newnode on submenu item.
				if (parentItem === '#'){ 
					node = sesMenu.navigation; 
					position === 'first' ? node.unshift(newnode) :  position === 'last' ? node.push(newnode) : node.splice(position, 0, newnode);
				}
				else {
					parentNode = sesMenu.navigation.find(o => o.title.EN === parentItem || o.title.ES === parentItem);
					// insert on submenu
					position === 'first' ? parentNode.submenu.unshift(newnode) :  position === 'last' ? parentNode.submenu.push(newnode) : parentNode.submenu.splice(position, 0, newnode);
				}		
			}
		}
		
		console.log('NODE UPDATED!: ' + JSON.stringify(node));
		// updating session
		strJson = JSON.stringify(sesMenu);
		sessionStorage.setItem('menu',strJson);
			
		// call session menu to reload changes.
		sessionMenu("session");						
	};
	
	// CONTROLLER PUBLIC FUNCTIONS 
	return{
		
		// LOAD() JSON LOAD FROM TEMPLATE TO CONTROLLER
		load: function(Data) { 
			logControl ? console.log("\n" +LIB_TITLE + ': load()') : '';
			return menuReg = Data;
		},
		
		lang: function(lang){
			logControl ? console.log("\n" +LIB_TITLE + ': lang()') : '';
			logControl ? console.log('|---> lang() -> assign current Language to Console Menu: ' + lang) : '';
			return currentLanguage = lang;
			
		},
		
		// INIT() CONTROLLER INIT CALLS
		init: function(){
			logControl ? console.log("\n" +LIB_TITLE + ': init()') : '';
			
			// load menu (role)
			consoleMenu();
			
			// INICIALIZACIÓN DE BUSCADORES LIVE-SEARCH 
			$('#search-query').keyup(function(){
			
			var searchValue = $(this).val().toLowerCase();
				// selector para coger todos los span donde están los títulos de los menus.
				var Menus = $('.page-sidebar-menu > li.nav-item > ul.sub-menu  > li.nav-item > a.nav-link.nav-toggle > span.title');
					
				// live-search 
				var matchProjects = '';
				if (searchValue !== '') {
					Menus.each(function( index ){
						if (index < 0) { return; }
						var menuTitle = $(this).text().toLowerCase();
						if ( menuTitle.includes(searchValue) ){
							//lo incluye: hacemos algo para remarcar el título o lo que se nos ocurra, o nada.
							logControl ? console.log($(this).text() + ' - ' + searchValue + '-> SI'): '';
							 $(this).parents("li.nav-item > ul.sub-menu  > li.nav-item").show();	
						}
						else {
							// no lo incluye
							logControl ? console.log($(this).text() + ' - ' + searchValue + ' -> NO'): '';
							$(this).parents("li.nav-item > ul.sub-menu  > li.nav-item").hide();							
						}
					});
					
					// CONTROL DE MENUS PPALES completamente ocultos
					var submenus = $('.page-sidebar-menu > li.nav-item > ul.sub-menu');
					submenus.each(function( index ){
						logControl ? console.log(index +' totales: ' + $(this).children().length + ' ocultos: ' + $(this).children('li[style*="display: none"]').length): '';						
						if ($(this).children().length == $(this).children('li[style*="display: none"]').length){							
							$(this).parent('li.nav-item').addClass('hided').hide();
						}
						else{
							$(this).parent('li.nav-item').removeClass('hided').show();
						}
					});
				}
				else{
					// si hay algún proyecto oculto lo volvemos a mostrar	
					$('.page-sidebar-menu > li.nav-item > ul.sub-menu  > li.nav-item').show();
					$('.hided').removeClass('hided').show();
				}
			})
		},
		configMenu: function(type){			
			logControl ? console.log("\n" +LIB_TITLE + ': configMenu() from session? '+ type) : '';
			sessionMenu(type);
			
		},
		itemMenu: function(type){
			logControl ? console.log("\n" +LIB_TITLE + ': updateItemMenu()') : '';
			sessionItemMenu(type);
		
		}
			
	}
}();

// AUTO INIT CONTROLLER WHEN READY
jQuery(document).ready(function() {
	
	// LOADING JSON DATA FROM THE TEMPLATE (CONST, i18, ...)
	MenuController.load(menuJson);
	// LOADING CURRENT LANGUAGE FROM THE TEMPLATE
	MenuController.lang(currentLanguage);	
	// AUTO INIT CONTROLLER.
	MenuController.init();
});
