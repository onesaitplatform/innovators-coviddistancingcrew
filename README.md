# innovators-coviddistancingcrew
Control de distanciamiento social en estaciones de Metro

Para acceder a la demo utilice el usuario **coviddistancingcrew** y la contraseña **Innovators2020!** para logarse en el siguiente enlace: 	https://lab.onesaitplatform.com/web/CDC_frontend/index.html

El Dashboard puede encontrarse en el siguiente enlace: https://lab.onesaitplatform.com/controlpanel/dashboards/view/2f20e58c-f75d-45ee-aee7-bed8119ec2a3

Puede visualizar una demo de la Aplicación en el siguiente video:https://youtu.be/7aMVP_0Ak4c

A continuación se muestra la pantalla de login y la página principal:

**Pantalla de Login**

![alt text](https://github.com/onesaitplatform/innovators-coviddistancingcrew/blob/master/images/Login.PNG)

**Pantalla Principal**

![alt text](https://github.com/onesaitplatform/innovators-coviddistancingcrew/blob/master/images/Index.PNG)

# 1	Contexto

En este documento se va a definir el funcional de la idea “Control distanciamiento social en estaciones de Metro” para la iniciativa de Innovators realizada sobre la Onesait Platform.
Para esta demo vamos a centrarnos en el Metro de la ciudad de Madrid.
También se identificarán los elementos desarrollados sobre la Onesait Platform.

# 2 Definición de pantallas

A continuación, se van a describir las diferentes pantallas que formarán la aplicación.

## 2.1	Pantalla principal

### 2.1.1	Visor GIS

Aparecerá un **visor GIS** centrado en la ciudad de Madrid, en el cual aparecerán representados los siguientes elementos:

**Estaciones de Metro**: cada una contendrá la siguiente información para su explotación en futuros usos:
  * id: campo de identificación único oficial de cada estación.
  * name: nombre oficial de la estación de Metro.
  * lines: listado de líneas de Metro coincidentes con la estación.
  * status: estado de la estación respecto al nivel de alarma.
  * visible: campo que indica si se visualiza o no la estación en el mapa.

**Ascensores**: : cada uno contendrá los siguientes campos:
  * id: campo de identificación único interno de cada ascensor.
  * type: el tipo de ascensor que es (interno, externo).
  * active: campo que indica si se encuentra en funcionamiento o no.
  * address: la dirección oficial del ascensor, en caso de ser externo.
  * postalCode: el código postal del municipio donde se encuentra el ascensor.
  * municipality: el municipio al que pertenece el ascensor.
  * station_id: el identificador correspondiente a la estación en la que pertenece el ascensor.
  * status: estado de la estación respecto al nivel de alarma.
  * visible: campo que indica si se visualiza o no la estación en el mapa.

**Escaleras mecánicas**: cada escalera contará con los siguientes datos:
  * id: campo de identificación único oficial de casa escalera.
  * type: el tipo de escalera mecánica que es (interna, externa).
  * active: campo que indica si se encuentra en funcionamiento o no.
  * status: estado de la estación respecto al nivel de alarma.
  * visible: campo que indica si se visualiza o no la estación en el mapa.
  
**Líneas de Metro**: cada una tendrá la siguiente información:
  * id: campo de identificación oficial único de cada línea.
  * name: nombre de la línea.
  * label: nombre de la cabecera y final de línea.
  * color: color oficial de la línea.
  * visible: campo que indica si se visualiza o no la estación en el mapa.

**Andenes**: cada andén contendrá los siguientes campos:
  * id: campo identificador único interno de cada andén.
  * type: tipo de andén (lateral o central).
  * line: línea a la que pertenece el andén.
  * station_id: el identificador correspondiente a la estación en la que pertenece el andén.
  * status: estado de la estación respecto al nivel de alarma.
  * visible: campo que indica si se visualiza o no la estación en el mapa.

**Pasillos**: cada pasillo contará con la siguiente información:
  * id: campo de identificación único de cada tramo de pasillo.
  * status: estado de la estación respecto al nivel de alarma.
  * visible: campo que indica si se visualiza o no la estación en el mapa.

**Trenes**: cada tren tendrá los siguientes contenidos:
  * id: campo de identificación único de cada tren.
  * direction: sentido en el que irá el tren (1 ó 2).
  * status: estado de la estación respecto al nivel de alarma.
  * visible: campo que indica si se visualiza o no la estación en el mapa.

Los elementos del mapa seguirán un código de colores para que de un solo vistazo se puedan identificar los elementos con alertas o avisos.
*	Rojo: el elemento tiene al menos una alerta activa
*	Amarillo: el elemento tiene al menos un aviso activo
*	Verde: el elemento no tiene ni avisos ni alertas

### 2.1.2	Indicadores

A continuación, se definen los indicadores que se mostrarán en el dashboard principal:
*	Número de estaciones controladas
*	Número de avisos
*	Número de alertas
*	Número de andenes controlados
*   Número de ascensores controlados

Todos los indicadores tendrán un filtro de tiempo, para poder visualizar los datos de:
*	En tiempo real
*	Últimas 6 horas
*	Últimas 12 horas
*	Últimas 24 horas
*	Última semana

### 2.1.3	Interacción entre elementos

Nada más entrar en la pantalla principal aparecerán todos los datos de manera general, es decir, de todas las estaciones de la ciudad.

Cuando se seleccione una estación en el visor GIS:
*	Se filtrarán los indicadores para mostrar sólo los datos de la estación seleccionada.
*	Aparecerá un botón para poder acceder al detalle de la estación seleccionada, lo que nos redirigirá a la pantalla detalle.

## 2.2	Pantalla detalle

A esta pantalla se podrá acceder tanto desde el menú de la aplicación cómo desde el botón de detalle de cada estación.

### 2.2.1	Interacción ente elementos

Aparecerá el mapa de la estación seleccionada y sobre el mapa se representarán los siguientes elementos:
*	**Cámaras de seguridad**: seleccionando una cámara de seguridad aparecerán las imágenes de dicha cámara y mediante un algoritmo de reconocimiento de imágenes aparecerán marcadas las personas que no estén guardando la distancia de seguridad o que no llevén mascarilla.
*	**Tornos**: seleccionando un torno se podrá activar o desactivar, a través de un botón, dicho torno para poder controlar el aforo de la estación.

Aparecerán los indicadores definidos en la pantalla principal pero filtrados para la estación seleccionada. Además, aparecerá un listado de alertas y avisos de la estación.
Las alertas seguirán el mismo código de colores que el visor GIS de la pantalla principal y podrá haber los siguientes tipos de alertas:
*	**Distanciamiento social**: Cuando no se respeta el distanciamiento social entre los usuarios del metro.
*	**Ausencia de mascarilla**: cuando un usuario no lleva mascarilla
*	**Vigilancia de tornos**: cuando un usuario se salta un torno, ya sea porque está bloqueado para controlar el aforo o para no pagar el billete.
*	**Aforo**: cuando se sobrepase el aforo permitido para poder respetar la distancia de seguridad.

## 2.3	Pantalla control de megafonía

Sobre el visor GIS se podrán seleccionar una o varias estaciones y a continuación se elegirá qué tipo de mensaje se quiere reproducir:
*	**Audio en vivo**: se podrá reproducir un mensaje en tiempo real en las estaciones seleccionadas
*	**Mensaje pregrabado**: se seleccionará de una lista el audio pregrabado que se quiere reproducir.

# 3	Elementos desarrollados sobre Onesait Platform

En este apartado se van a identificar todos los elementos desarrollados sobre la Onesait Platform, así como el análisis del código externo proporcionado en Github.
Los elementos se han creado en el entorno CloudLab ( https://lab.onesaitplatform.com/controlpanel ) con el usuario coviddistancingcrew/Innovators2020!

## 3.1	Ontologías

Se han creado las siguientes ontologías:
*	**CDC_alarm**: en esta ontología se almacenan las alarmas
*	**CDC_Metro_Elevators**: en esta ontología se almacena la información de georreferenciación de los ascensores de cada estación de Metro.
*	**CDC_Metro_Platforms**: dónde se almacena la información de georreferenciación de los andenes de cada estación de Metro.
*	**CDC_Metro_Stations**: dónde se almacena la información de las estaciones de Metro.

![alt text](https://github.com/onesaitplatform/innovators-coviddistancingcrew/blob/master/images/Ontologies.PNG)

## 3.2	Datasources

Se han creado los siguiente datasources que luego serán utilizados en los dashboards:
*	**CDC_Alarms**: obtiene todas las alarmas (severity=HIGH) y que estén abiertas.
*	**CDC_Alarms_Table**: obtiene todas las alarmas para la representación en formato tabla.
*	**CDC_Avisos**: obtiene todas las alarmas (severity=MEDIUM) y que estén abiertas.
*	**CDC_Stations**: obtiene el número de estaciones de Metro.
*   **CDC_Elevators**: obtiene el número de ascensores contorlados.
*   **CDC_Platforms**: obtiene el número de andenes contorlados.

![alt text](https://github.com/onesaitplatform/innovators-coviddistancingcrew/blob/master/images/Datasources.PNG)

## 3.3	Dashboard

Se ha creado el dashboard CDC_Main dónde se representa el Visor GIS con el estado de cada estación de Metro, así como el listado de marcadores y la tabla de alertas.

![alt text](https://github.com/onesaitplatform/innovators-coviddistancingcrew/blob/master/images/Dashboard.PNG)

## 3.4	Proyecto Web

Este proyecto se despliega en la Onesait Platform como Proyecto Web. Podemos distinguir 3 partes en la parte de frontend: Plantillas HTML, Mapas GIS (cesiumMap) y sección de librerías javascript y de estilo CSS de la aplicación (assets).

![alt text](https://github.com/onesaitplatform/innovators-coviddistancingcrew/blob/master/images/WebProject.PNG)

### 3.4.1	Plantillas HTML

Las plantillas que usamos en el proyecto, son Index y login, ambas plantillas configurables para que se ajusten en todo momento a las necesidades del proyecto. La plantilla login (login.html) se usa para hacer el login de usuarios contra la aplicación realizando un proceso de autenticación para el acceso a la plantilla Index.
La plantilla Index (index.html), es el Home web del proyecto, desde allí, con una visualización y un sistema de menús configurable (que veremos luego más detalladamente en la sección de librerías de frontend de la aplicación) se puede acceder a todos los elementos de gestión del frontend.
Cada una de estas pantallas o visualizaciones están encapsuladas en dashboards, estos dashboards, son elementos de visualización dinámicos compuestos de gadgets/widgets que interactúan entre sí y cargan datos de forma óptima.

### 3.4.2	Librerías JavaScript y CSS

En el proyecto además de las librerías de estilos básicas y de las librerías de JavaScript básicas que se usan en los dashboards para sus gadgets genéricos, es necesario para algunas de las funcionalidades desarrolladas una serie de librerías open-source adicionales, a continuación, se describen todas ellas.
Las vamos a dividir en archivos de aplicación “app” y archivos de terceros, “vendors” que son plugins o librerías open-source que se utilizan para generar gadgets livehtml o funcionalidades específicas en algunos de ellos.

## 3.5	Simulador 

Se ha creado un proyecto maven para simular los datos de las alertas y el visor GIS, para ello se ha utilizado la librería iotclient4springboot proporcionada por Onesait Platform para poder interactuar con las Ontologías desde el propio proyecto.
