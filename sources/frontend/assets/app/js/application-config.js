/*  ############ MENU CONFIGURATION ###############################################################################
	Version 1.0
	Allow to load single nav-item or nav-items with submenus.
	Allow 3 different types of content: Links, Separators and Dashboards (iframe loaded)
		[Link]: link to other template 
		Fill url and leave dashboard empty dashboard:{}
		
		[Separator]: just separator between nav-items
		Leave url empty url:"" and leave dashboard empty dashboard:{}
		
		[Dashboard]: leave url empty and fill dashboard object.
	
	CONFIGURATION OPTIONS:
	param			type					description
	---------------------------------------------------------------------------------------------------------------
	menu			String					name of menu.			
	rol				String					Rol of the user that load the menu
	home			Boolean					show or hide first nav-item (home, linked to index).
	noSession		String					template to go when there´s no session or expires.
	navigation		Array of Objects		The menu navigation items.
	
	--- ITEMs -----------------------------------------------------------------------------------------------------
	
	title			Object					nav-item title in english, spanish, ...loaded with <html lang="en" >
	icon			String					icon of the nav-item using icon fonts available flaticon- , fa- ,la-
	url				String					url of nav-item (http or https)
	submenu			Array of Objects		Array of nav-submen-items 
	dashboard		Object					Object with dashboard data configuration
	
	--- ITEMs > Dashboard -----------------------------------------------------------------------------------------
	
	src				String					url of Dashboard (http or https)
	title			String					Title of Dashboard	
	background		String					background Color (hex, rgb, rgba, hsl) (#FFF e.j.)
	height			String					Height of the iframe that contains the dashboard (850px e.j.)
	mode			String (op)				['INSERT','APPEND','AFTER'] defautl INSERT, not operative in V.1.0
	
*/
var host = window.location.hostname || 'lab.onesaitplatform.com'

// MENU JSON
var menuJson = {
  menu: 'OnesaitPlatform',
  rol: 'ROLE_DEVELOPER',
  home: true,
  noSession: 'login.html',
  navigation: [
    /*{"title":{"EN":"Activity","ES":"Actividad"},"icon":"flaticon-clock-1","url":"", "submenu":[], "dashboard":{"src":"https://" + host +"/controlpanel/dashboards/viewiframe/297b7862-a8ae-4956-8aee-da15168c02c1","title":"Workflows", "background": "#FFF", "height": "850px", "mode": "INSERT"}},								
		{"title":{"EN":"Ethnological Museum","ES":"Ethnological Museum"},"icon":"flaticon-layers","url":"",
		 "submenu":[		
			{"title":{"EN":"Detail","ES":"Detail"},"icon":"flaticon-desktop","url":"", "dashboard":{"src":"https://" + host +"/controlpanel/dashboards/viewiframe/97e7894d-864f-4b32-a537-562ecfefe07c","title":"Detail Dashboard", "background": "#FFF", "height": "1240px", "mode": "INSERT"}},
			{"title":{"EN":"Multimedia","ES":"Multimedia"},"icon":"flaticon-open-box","url":"", "dashboard":{"src":"https://" + host +"/controlpanel/dashboards/viewiframe/7aa43733-79ad-4967-a5cb-c9f9690b6172","title":"Multimedia Dashboard", "background": "#FFF", "height": "780px", "mode": "INSERT"}},
			{"title":{"EN":"Workflows","ES":"Workflows"},"icon":"flaticon-open-box","url":"", "dashboard":{"src":"https://" + host +"/controlpanel/dashboards/viewiframe/2a8000c7-e1d0-4958-b990-94ddd8bccce8","title":"Workflows", "background": "#FFF", "height": "800px","mode": "INSERT"}}			
		 ]
		},
		{"title":{"EN":"Configuration","ES":"Configuracion"},"icon":"","url":"", "submenu":[], "dashboard":{}},
		{"title":{"EN":"Devices","ES":"Dispositivos"},"icon":"la la-desktop","url":"", "submenu":[], "dashboard":{"src":"https://" + host +"/controlpanel/dashboards/viewiframe/3b4eae4e-b45b-49e7-bca5-2e0c80796154","title":"Devices Dashboard", "background": "#FFF", "height": "850px", "mode": "INSERT"}},
		{"title":{"EN":"Device Configuration","ES":"Configuracion de Dispositivos"},"icon":"flaticon-cogwheel-2","url":"", "submenu":[], "dashboard":{"src":"https://" + host +"/controlpanel/dashboards/viewiframe/0d6baad2-df46-48d6-b879-7c32ecd1e0a5","title":"Device Configuration Dashboard", "background": "#FFF", "height": "850px","mode": "INSERT"}}		
*/
  ]
}

/*  ############ END MENU CONFIGURATION ############################################################################ */

/*  ############ PAGE CONFIGURATION ###############################################################################
	Version 1.0
	Allow to configure the main App text and the elements of the template.
	You can configure the App (main), Header (top bar elements), content (first data to load like first dashboard, ...)
	and Footer element and link.
	
	CONFIGURATION OPTIONS:
	param					type					description
	-----------------------------------------------------------------------------------------------------------------
	title					String					title of template <title>
	description				String					Description of page, (meta)
	access					Object					Access, Paths and entry mode for App.
	
	--- Access: -----------------------------------------------------------------------------------------------------
	
	urlBasePath				String					Path base to templates.
	imgBasePath				String					Path to images.
	entry					String					["PRIVATE","PUBLIC"] access mode free or with login.
	urlBase					String					Console base path
	urlApi					String					Console API base path
	
	app						Object					App elements
	
	--- App: --------------------------------------------------------------------------------------------------------
	
	appLogo					String					img path string of logo image.
	appLogoCss				string					css for fixing custom logo.
	appLogoBackground		String					color for background applied to logo container .m-brand__logo
	appHome					String					text of App title or Home show it in header.
	appLoading				Boolean					*
	appFooter,				Boolean					show footer section or not.
	appStickymenu			Boolean					show sticky right menu or not.
	appWelcome				Boolean					show toastr notification with welcome or not.
	
	login					Object					Login elements
	
	--- Login: --------------------------------------------------------------------------------------------------------
	
	loginLogo				String (url)			image for login template
	loginLogoStyle			String (css)			css for adjust imagen logo if defined
	loginBackground			String (css)			css for background of login
	loginDescription		String (text)			a description showed in login template 
	signInTitle				String (text)			title for sign in form
	signUp					Boolean 				show or not singUP toggle and form
	forgotPassword			Boolean					show or not forgot password toogle and form
	rememberMe				Boolean					show or not remember me chekbox.
	termsAndConditions		Boolean					show or not the terms and condition chekbox.
	agreeInfoMsg			String (url)			text for the agree condition and terms
	privacyLink				String (url)			url for privacy template or file 
	conditionsLink			String (url)			url for conditions template or file
	
	
	header					Object					Header (top bar) elements and toolbars.
	
	--- Header: --------------------------------------------------------------------------------------------------------
	
	headerDashboads			Boolean					show header dashboard menu or not
	headerReports			Boolean					show header Report menu or not
	headerSearch			Boolean					show header Search input or not
	headerNotifications		Boolean					show header Notifications menu or not
	headerQuickactions		Boolean					show header Quick Actions menu or not
	headerUser				Boolean					show header User menu or not
	headerSidebarToggle		Boolean					show header Sidebar menu or not
	

	user					Object					user header elements
	
	--- user: --------------------------------------------------------------------------------------------------------
	
	showAvatar 				Boolean					show avatar and email of user or not.
	avatar					String					image of user avatar if defined
	profile 				Object link				user Profile link
	support  				Object link				user support link
	activity				Object link				user activity link
	messages				Object link				user activity link
	faq						Object link				user faq link
	support					Object link				user support link
	logout 					Object link				user Logout  link function to logout.	
	
		
	content					Object					Content elements and data to initially Load
	
	--- Content: --------------------------------------------------------------------------------------------------------
	
	contentHead				Boolean					Show content head in card
	contentTitle			String					title of card in content
	contentTools			Boolean					show card tools (collapse and fullscreen)
	contentPadding			String					modifies if defined, the padding of the content zone
	contentDashboard		Object Dashboard		contains the first dashboard to load initially on the page
	
	--- Content > contentDashboard: -------------------------------------------------------------------------------------
	
		enabled				Boolean					Enable the loading of this dashboard or not.
		dashboardName		String					Dashboard title
		changeTitle			Boolean					change or not the dashboard title in the card title content
		notification		Boolean					show notification toastr when dashboard is loading or not 
		src					String					url (http, https) of the dashboar to load.
		background			String					if provided (#FFF), the background of the iframe that loads de dashboard
		height				String					if provided (800px), the height of iframe that load the dashboard
		mode				String					['INSERT','APPEND','AFTER'] mode of loading, INSERT 
				
	
	footer					Object					Footer element and footer links	
	
	--- Footer: --------------------------------------------------------------------------------------------------------
	
	footerCopyright			String					Footer left text
	footerLinks				Boolean					show the links of the right part of the footer or not
	footerLinkAbout			Object link				Footer right link About
	footerLinkPrivacy		Object link				Footer right link Privacy
	footerLinkTerms			Object link				Footer right link Terms and conditions
	footerLinkCompany		Object link				Footer right link Company
	footerLinkSupport		Object link				Footer right link Support
	
	--- Footer > Object link: ------------------------------------------------------------------------------------------
		
		link				String					url (http,https) of the footer link
		text				String					text for the footer Link
		visible				Boolean					show or not that link
	
	
	themes					Object					App themes and styling configuration and settings
	
	--- Themes: --------------------------------------------------------------------------------------------------------
	
	skin					String					skin for the App [skin-light, skin-dark] not enabled in V.1.0
	contentBackground		String					if defined, backgroundColor of the content zone.
	
*/

// FRONTEND MAIN CONFIGURATION
var mainJson = {
  title: 'Innovators 2020 - Covid Distancing',
  description: 'Metro Control Center',
  currentSkin: 'skin-light',
  access: {
    urlBasePath: '',
    imgBasePath: 'assets/app/media/img/',
    entry: 'PRIVATE',
    urlBase: 'https://' + host + '/',
    urlApi: 'https://' + host + '/api-manager/server/api'
  },
  app: {
    appLogo: 'assets/app/media/img/logos/logo.png',
    appLogoCss: 'width: auto; max-height: 61px;',
    appLogoBackground: '',
    appHome: 'Metro Control Center',
    appLoading: 'assets/app/media/img/bg/logo_metro_madrid.png',
    appFooter: true,
    appStickymenu: false,
    appWelcome: false
  },
  login: {
    loginLogo: 'assets/app/media/img/bg/logo_metro_madrid.png',
    loginLogoStyle: 'width: auto;height: 186px;',
    loginBackground: 'assets/app/media/img/bg/metro_madrid_login_bg.jpg',
    loginDescription: 'Welcome to Metro Control Panel',
    signInTitle: 'Please sign in:',
    signInBtnColor: '',
    signUp: false,
    forgotPassword: false,
    rememberMe: false,
    termsAndConditions: false,
    agreeInfoMsg: 'Please, check the agree Privacy and Terms to access',
    privacyLink: '',
    conditionsLink: ''
  },
  user: {
    showAvatar: true,
    avatar: 'assets/app/media/img/users/user.png',
    profile: { link: 'profile.html', text: 'ROL', visible: false },
    support: { link: 'support.html', text: 'Support', visible: false },
    activity: { link: 'activity.html', text: 'Activity', visible: false },
    messages: { link: 'messages.html', text: 'Messages', visible: false },
    faq: { link: 'faq.html', text: 'FAQ', visible: false },
    logout: { link: 'login.html', text: 'Logout', visible: true }
  },
  header: {
    headerDashboads: false,
    headerReports: false,
    headerSearch: false,
    headerNotifications: false,
    headerQuickactions: false,
    headerUser: true,
    headerSidebarToggle: false,
    headerSessionConfiguration: false
  },
  content: {
    contentHead: false,
    contentHeadCss:
      'background-color: #2c2e3e; border: none !important; margin-left: -1px ; margin-top: -1px',
    contentTitle: 'Metro Control Panel',
    contentTitleCss: 'color: #ffb822 !important',
    contentTools: true,
    contentDashboard: {
      enabled: true,
      dashboardName: 'Metro Control Panel Dashboard',
      changeTitle: true,
      notification: false,
      src:
        'https://' +
        host +
        '/controlpanel/dashboards/viewiframe/2f20e58c-f75d-45ee-aee7-bed8119ec2a3',
      background: '#FFF',
      height: '700px',
      mode: 'INSERT'
    }
  },
  footer: {
    footerCopyright:
      '2020 &copy; Innovators 2020 - Metro Control Panel by covidcontrolcrew',
    footerLinks: true,
    footerLinkAbout: { link: 'about.html', text: 'About', visible: true },
    footerLinkPrivacy: { link: 'privacy.html', text: 'Privacy', visible: true },
    footerLinkTerms: { link: 'terms.html', text: 'Terms', visible: true },
    footerLinkCompany: { link: 'company.html', text: 'Minsait', visible: true },
    footerLinkSupport: {
      link: 'support.html',
      text: 'onesait Support Center',
      visible: true
    }
  },
  themes: {
    availableSkin: ['skin-light', 'skin-dark'],
    changeSkin: 'skin-dark',
    'contentBackground ': '#f5e2b3;',
    contentPadding: '0px 0px',
    menu: ''
  }
}
