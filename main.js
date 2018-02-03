var wr = { id : function(str){return document.getElementById(str)} };

var scriptTag = '';

//main

window.onpopstate = function() {

if (window.location.href.indexOf("state=1") > -1){
  
 closeExtra('know-more-popup');
}

else if (window.location.href.indexOf("state=5") > -1){
  
 closeExtra('know-more-popup');
}

else if (window.location.href.indexOf("qr") > -1){
  
  location.reload();
}

else if (window.location.href.indexOf("tp") > -1){
  
  location.reload();
}

else{
  location.reload();
} 

}

function CorrectURL() {


if (navigator.appName !== "Netscape")
{
   window.location = "http://heylle.com/outdated.html";
}

  
}

function MainClick() 
{
  deabout();
  showVideos();
  show_websites();
  wr.id("wikipedia").style.width = "0";
  wr.id("wikipedia").style.height = "0.1vw";
  wr.id("wikipedia").style.overflow = "hidden";
  AccessE();
  wr.id('output').innerHTML = '';
  wr.id('RichWIki').innerHTML = '';
  wr.id("Videos").innerHTML = "";
  wr.id("sites").innerHTML = "";

        var titleM = wr.id('search-main').value;
        document.title = titleM+" | Heylle search";
        var titleN = titleM.replace(/'/g,"%27");
        var titleF = titleN.replace(/ /g,"%20");

        if (window.location.href.indexOf("?qr="+titleF) == '-1'){
        
         history.pushState({state:1}, "State 1", "?qr="+titleF);
       }
  
}



function MainEnter(enterKey) 
{

  deabout();

  
 if (enterKey.keyCode == '13') {
      
    MainClick();

  }
  
}



function AccessE(title) {

  if(title){

    var Mainterms = title.toLowerCase();

  }else{

    var Mainterms = wr.id('search-main').value.toLowerCase();

  }

  
    
  if (Mainterms !== "") {    

        if (screen.width <= 600) {
            wr.id("search-main").blur();
      }

          wr.id('RichWIki').innerHTML = '';
          wr.id('output').innerHTML = '';
          wr.id("smartAns").style.display = "none";

          var srterm3 = Mainterms.replace("what's ",'').replace('what','').replace('who','').replace('is ','').replace('are','').replace("did ",'').replace("the ",'');


          if (Mainterms.indexOf('what') !== -1 || Mainterms.indexOf('when') !== -1 || Mainterms.indexOf('where') !== -1 || Mainterms.indexOf('who') !== -1) {

            var q5 = srterm3.replace("when ",'').replace("where ",'').replace("was ",'');

            if (q5.indexOf('of') !== -1) {
              var Ofindex = q5.indexOf('of');
              var beforeOf = q5.substr(0,Ofindex-1).replace(" ",'');
              var Ofafter = q5.substr(Ofindex +2,q5.length).replace(' ','');


              subjectid(Ofafter);
              propertyid(beforeOf);
               AccessE(Ofafter);
             // alert(beforeOf);
             // alert(Ofafter);
              
            }else{
             // alert("get the last string");
            }

          }



    var scriptTag = document.createElement('script');
    scriptTag.src = 'https://en.wikipedia.org/w/api.php?action=opensearch&callback=getFMainData&limit=7&namespace=0&search='+srterm3;
     // scriptTag.src = 'https://en.wikipedia.org/w/api.php?action=query&format=json&redirects=1&callback=getFMainData&list=search&srlimit=7&srinfo=&srprop=&srwhat=text&srsearch='+Mainterms;
    document.body.appendChild(scriptTag);
    wr.id("loading").style.display = "block";
    positionsys(); 
  }
}

function subjectid(title){

                
                var extraTag = document.createElement('script');
                extraTag.src = 'https://www.wikidata.org/w/api.php?action=wbsearchentities&callback=getSubjectID&format=json&search='+title+'&limit=1&language=en&type=item&props=';
                document.body.appendChild(extraTag);
                return false;
}

var character;

function getSubjectID(data){

  subject(data.search[0].id);

  character = data.search[0].label;
  
}



function propertyid(title0){

                var title = title0.replace("age","date of birth").replace("Mayor","head of government").replace("chief minister","head of government").replace("prime minister","head of government").replace("president","head of state");
                var extraTag = document.createElement('script');
                extraTag.src = 'https://www.wikidata.org/w/api.php?action=wbsearchentities&callback=getpropertyID&format=json&search='+title+'&limit=2&language=en&type=property&props=';
                document.body.appendChild(extraTag);
                return false;
}

var qproperty;
var qproperty2;

function getpropertyID(data){

  qproperty = data.search[0].id;

  if (data.search.length > 1) {
    qproperty2 = data.search[1].id;
  }
}




function subject(title){
                var extraTag = document.createElement('script');
                extraTag.src = 'https://www.wikidata.org/w/api.php?action=wbgetentities&format=json&callback=getsubject&ids='+title+'&props=claims&languages=en';
                document.body.appendChild(extraTag);
                return false;
}




function getsubject(data){
  for (var x in data.entities ) {

   // for (var i = 0; i <= qproperty.length-1; i++) {

     if (qproperty == 'P569'){

      // Retriving age Process

      var dob = data.entities[x].claims[qproperty][0].mainsnak.datavalue.value.time;

      var dobcut = dob.substr(1,5);

      wr.id("smartAns").style.display = "block";

      var yearsold = 2017-parseInt(dobcut);
      wr.id("smartAns").innerHTML = '<a>'+character +" is <large>"+ yearsold+'</large> Years old </a> ';



     } else if (data.entities[x].claims[qproperty]) {

          if(data.entities[x].claims[qproperty][0].mainsnak.datavalue.value.amount){

            wr.id("smartAns").style.display = "block";

            wr.id("smartAns").innerHTML = data.entities[x].claims[qproperty][0].mainsnak.datavalue.value.amount.replace("+",'');

            if(data.entities[x].claims[qproperty][0].mainsnak.datavalue.value.unit){

              var unitIN = data.entities[x].claims[qproperty][0].mainsnak.datavalue.value.unit.replace("http://www.wikidata.org/entity/","");

              whatunit(unitIN);

            }

          }else if(data.entities[x].claims[qproperty][0].mainsnak.datavalue.value.id){



                  whatid(data.entities[x].claims[qproperty][0].mainsnak.datavalue.value.id);

          }else{

            wr.id("smartAns").style.display = "block";

             wr.id("smartAns").innerHTML = data.entities[x].claims[qproperty][0].mainsnak.datavalue.value;
          }

        

     }else if(data.entities[x].claims[qproperty2]){

          if(data.entities[x].claims[qproperty2][0].mainsnak.datavalue.value.amount){

            wr.id("smartAns").style.display = "block";

            wr.id("smartAns").innerHTML = data.entities[x].claims[qproperty2][0].mainsnak.datavalue.value.amount.replace("+",'');

            if(data.entities[x].claims[qproperty2][0].mainsnak.datavalue.value.unit){

              var unitIN = data.entities[x].claims[qproperty2][0].mainsnak.datavalue.value.unit.replace("http://www.wikidata.org/entity/","");

              whatunit(unitIN);

            }

          }else if(data.entities[x].claims[qproperty2][0].mainsnak.datavalue.value.id){



                  whatid(data.entities[x].claims[qproperty2][0].mainsnak.datavalue.value.id);

          }else{

            wr.id("smartAns").style.display = "block";

             wr.id("smartAns").innerHTML = data.entities[x].claims[qproperty2][0].mainsnak.datavalue.value;
          }

     }

       
  //  }


 }

}

function whatunit(title){

                
                var extraTag = document.createElement('script');
                extraTag.src = 'https://www.wikidata.org/w/api.php?action=wbsearchentities&callback=getwhatunit&format=json&search='+title+'&limit=1&language=en&type=item&props=';
                document.body.appendChild(extraTag);
                return false;
}

function getwhatunit(data){

  //alert("new");
  wr.id("smartAns").style.display = "block";
  wr.id("smartAns").innerHTML += " "+data.search[0].label;
  
}


function whatid(title){

                
                var extraTag = document.createElement('script');
                extraTag.src = 'https://www.wikidata.org/w/api.php?action=wbsearchentities&callback=getwhatid&format=json&search='+title+'&limit=1&language=en&type=item&props=';
                document.body.appendChild(extraTag);
                return false;
}

function getwhatid(data){

  //alert("new");
  wr.id("smartAns").style.display = "block";
  wr.id("smartAns").innerHTML = data.search[0].label;
  
}

var lengthR = "0";

function getFMainData(data){

 // alert(data[1][0]);





   
   if (data[1] == "") 
    {
      wr.id("loading").style.display = "none";
      wr.id('output').style.display = "none";
      wr.id('wikipedia').style.display = "none";
        
    } 
    else 
    {

        var Richdata = data[1][0];

        var RichFiltered = Richdata.replace("+","%2B");

      var scriptTag = document.createElement('script');
      scriptTag.src = 'https://en.wikipedia.org/w/api.php?action=query&format=json&redirects=1&callback=getRMainData&prop=pageimages%7Cextracts&pithumbsize=300&titles='+RichFiltered+'&pilicense=any&exsentences=4&explaintext=1&exsectionformat=plain';
      document.body.appendChild(scriptTag);


        lengthR = data[1].length;

     
     for (var i = 1; i < data[1].length; i++) {



        var gotdata = data[1][i];
        var strFiltered;

      strFiltered = gotdata.replace("+","%2B");

     // if( i == '1'){
     //    wr.id('output').innerHTML = '';
      // alert(strFiltered);
      //}

      var scriptTag = document.createElement('script');
      scriptTag.src = 'https://en.wikipedia.org/w/api.php?action=query&format=json&redirects=1&callback=getEMainData&prop=pageimages%7Cextracts&pithumbsize=200&titles='+strFiltered+'&pilicense=any&exsentences=1&explaintext=1';
      document.body.appendChild(scriptTag);
       
     }

    } 
}


/*
//Getting andlisting data
wr.id('search-main').onkeyup = function searchFun(e)
{
    if(!e.keyCode.toString().match(/^(37|38|39|40|13|16|17|18|224)$/))
    {
      deabout();
      if(scriptTag!==''){ document.body.removeChild(scriptTag); }
      scriptTag = document.createElement('script');
      var Mainterm = wr.id('search-main').value; 
      wr.id('output').innerHTML = '';
      scriptTag.src = 'https://en.wikipedia.org/w/api.php?action=query&format=json&callback=getMainData&list=search&sroffset=1&srsearch='+Mainterm;
      document.body.appendChild(scriptTag);
      
    }
}
*/

function positionsys(){



    wr.id('home-bar').style.position = 'absolute';
    wr.id('home-bar').style.top = '2.1vw';
    wr.id('home-bar').style.right = '1vw';
    wr.id('home-bar').style.width = 'auto';
    wr.id('home-bar').style.height = '3vw';
    wr.id('home-bar').style.color = 'whitesmoke';
    wr.id('home-bar').style.backgroundColor = 'transparent';
    wr.id('bod').style.backgroundColor = '#69a8c0';
    wr.id('list').style.position = 'relative';
    wr.id('list').style.bottom = '0';
    wr.id('list').style.left = '-3vw';
    wr.id('list').style.top = '1vw';
    wr.id('menuimg').style.height = '3.3vw';
    wr.id('menuimg').style.boxShadow = 'none';



    wr.id('bod').style.overflowY ="visible";
    wr.id('hey1').style.height = '3.5vw';
    wr.id('hey1').style.padding = '0';
    wr.id('hey1').style.boxShadow = 'none';

    wr.id('hey2').style.display = 'none';
   
    wr.id('main-input').style.marginTop = '0';
    wr.id('main-input').style.padding = '0';
    wr.id('main-input').style.marginRight = '12vw';
    
    wr.id('navigation').style.float = 'left';
    wr.id('navigation').style.padding = '0';
    wr.id('navigation').style.marginLeft = '7vw';
    wr.id('navigation').style.marginTop = '0.2vw';

    wr.id('circular').style.marginTop = '2vw';
    wr.id('circular').style.width = '100vw';
    wr.id('circular').style.height = 'auto';
    wr.id('circular').style.background = 'none';
    wr.id('circular').style.boxShadow = 'none';
    wr.id('circular').style.border = '0vw';
    wr.id('circular').style.borderRadius = '0vw';

    wr.id('search-main').style.width = '47vw';
    wr.id('search-main').style.height = '3.5vw';
    wr.id('search-main').style.fontSize = '1.75vw';
    wr.id('search-main').style.borderRadius = '0.5vw';

    wr.id('search-svg').style.top = '2.35vw';
    wr.id('search-svg').style.right = '27vw';
    wr.id('search-svg').style.width = '3vw';
    wr.id('search-svg').style.height = '2.5vw';
    wr.id('search-svg').style.padding = '0.2vw';
    wr.id('search-svg').style.borderRadius = '0.5vw';



    if (screen.width <= 600) {

      wr.id('navigation').style.marginLeft = '4vw';
       wr.id('circular').style.marginTop = '0';
      wr.id('search-main').style.height = '10vw';
      wr.id('main-input').style.marginRight = '0';
      wr.id('main-input').style.right = '2.5vw';
      wr.id('search-main').style.borderRadius = '2vw';
      wr.id('search-main').style.width = '74vw';
      wr.id('search-main').style.marginTop = '0';
      wr.id('hey1').style.top = '2vw';
      wr.id('hey1').style.height = '11vw';
      wr.id('navigation').style.top = '0.5vw';
      wr.id('navigation').style.left = '0.2vw';
      wr.id('search-svg').style.top = '5.5vw';
      wr.id('search-svg').style.right = '7vw';
      wr.id('search-svg').style.height = '8vw';
      wr.id('search-svg').style.width = '8vw';
      wr.id('home-bar').style.top = '11vw';
      wr.id('home-bar').style.right = '8vw';
      wr.id('dots').style.display = 'none';

    }
}

function getRMainData(data) 
{   
  //  wr.id('output').innerHTML = '';
   // wr.id('feeds').innerHTML = '';
    wr.id('RichWIki').innerHTML = '';

    var strFiltered;
    wr.id("RichWIki").style.display = "block";
    
     wr.id("loading").style.display = "none";
     wr.id("wikipedia").style.display = "block";
     wr.id("wikipedia").style.width = "87vw";
     wr.id("wikipedia").style.height = "auto";
     wr.id("wikipedia").style.overflow = "visible";

     
       for (var x in data.query.pages ) {

        var str = data.query.pages[x].title;
        var sdat = data.query.pages[x].extract;
        
        filter0 = str.replace(/\"/g,"%22");
        filter = filter0.replace(/\+/g,"%2B");
        strFiltered = filter.replace(/'/g,"%27");

        var c = sdat.length; 

        if(c > 480){
        c = 400;
         }


      if (data.query.pages[x].thumbnail){

        var Idat = data.query.pages[x].thumbnail.source;
        
        showinfobox(strFiltered);

       wr.id('RichWIki').innerHTML +=  '<a onclick="return showmore(\''+strFiltered+'\')"  href="http://heylle.com/?tp='+strFiltered+'"> <p id="output-R">  <img src='+Idat+' id="resultIa"><span id=moveM> <b><medium id="anchor">'+str+'</medium></b><br>'+sdat.substr(0,c)+'<span>...</span></span> <span id="infobox">  </span> </p>    </a> '; 
       
              
   }else{

    var sdat = data.query.pages[x].extract;

    if( sdat.length > 50 ){

  

    showinfobox(strFiltered);

    wr.id('RichWIki').innerHTML +=  '<a onclick="return showmore(\''+strFiltered+'\')"  href="http://heylle.com/?tp='+strFiltered+'"><p id="output-R" ><span id="moveM" style="width:95% !important; font-size:1.3vw; height:auto; padding-bottom:2vw; "><b><medium id="anchor">'+str+'</medium></b><br>'+sdat.substr(0,c+400)+'<span>...</span></span> </p> </a>';


    }
    
   }
 }    
}




function getEMainData(data) 
{

  //Response of secondry wiki pages (multiple)

   // wr.id('output').innerHTML = '';
   // wr.id('feeds').innerHTML = '';
   // wr.id('RichWIki').innerHTML = '';

    var strFiltered;
    positionsys();  
     wr.id('output').style.display = "flex";
 
     
       for (var x in data.query.pages ) {

        var str = data.query.pages[x].title;
        var sdat = data.query.pages[x].extract;
        var c = 100; 
        
        filter0 = str.replace(/\"/g,"%22");
        filter = filter0.replace(/\+/g,"%2B");
        strFiltered = filter.replace(/'/g,"%27");
        


        if(str.length > 35){
           c = 50;
         }

 
      if (data.query.pages[x].thumbnail){

        var Idat = data.query.pages[x].thumbnail.source;
        

       wr.id('output').innerHTML +=  '<a   onclick="return showmore(\''+strFiltered+'\')"  href="http://heylle.com/?tp='+strFiltered+'"><p id="output-p" ><img src='+Idat+' id="resultIa"><span id=moveM><b><medium id="anchor">'+str+'</medium></b></span></p><a>'; 
       
              
   }else{

    var sdat = data.query.pages[x].extract;
    
    wr.id('output').innerHTML +=  '<a   onclick="return showmore(\''+strFiltered+'\')"  href="http://heylle.com/?tp='+strFiltered+'"><p id="output-p" ><span id="resultI" ><b>'+str.charAt(0)+'</b></span><span id=moveM><b><medium id="anchor">'+str+'</medium></b></span></p></a>';

   }

   }


     
    
}

  function Playvideo(vidid){

    document.getElementById("player").style.display = "block";
    wr.id('pageMotion').style.display = "block";
    wr.id('backcover').style.display = "block";
    document.getElementById("player").innerHTML = '<iframe width="560" height="315" src="https://www.youtube.com/embed/'+vidid+'?autoplay=1" frameborder="0" allowfullscreen></iframe>' ;
    window.scrollTo(0, 0);
  }


  function showVideos()
  {
        var xmlhttp = new XMLHttpRequest();
       // document.getElementById("Videos").innerHTML = "Loading...";

    xmlhttp.onreadystatechange = function() 
    {
        if (this.readyState == 4 && this.status == 200) 
        {
          document.getElementById("Videos").innerHTML = "";
            myArr = JSON.parse(this.responseText);


             for (var i = 0; i <= myArr.items.length -1; i++) {

             // alert(i);

              document.getElementById('Videos').innerHTML += "<div onclick='Playvideo(\""+myArr.items[i].id.videoId+"\");' class='container'><img class='images' src=' " +myArr.items[i].snippet.thumbnails.medium.url+"'> <img id='play' src='images/play.png'> </div>";
            }

              
            

          }
      }

      xmlhttp.onerror = function()
      {
        document.getElementById("Videos").innerHTML = "sorry...";
      }
      
      xmlhttp.open("GET", "https://content.googleapis.com/youtube/v3/search?q="+wr.id('search-main').value+"&maxResults=8&part=snippet&key=AIzaSyDbxoOtKFsBdUbgg85UMhwWClUzlgSu7yw", true);
    xmlhttp.send();
  };

    function show_websites()
  {
        var xmlhttp = new XMLHttpRequest();
        //document.getElementById("sites").innerHTML = "Loading sites...";

    xmlhttp.onreadystatechange = function() 
    {
        if (this.readyState == 4 && this.status == 200) 
        {
          document.getElementById("sites").innerHTML = "";
            myArr = JSON.parse(this.responseText);

            //document.getElementById("sites").innerHTML = myArr;

             for (var i = 0; i <= myArr.items.length -1; i++) {

             // alert(i);

              document.getElementById('sites').innerHTML += "<a target='_blank' href="+myArr.items[i].link+" class='link'> <h5>"+myArr.items[i].title+"</h5><p>"+myArr.items[i].link+"<br>"+myArr.items[i].snippet+"</p></a>";
            }

              
            

          }
      }

      xmlhttp.onerror = function()
      {
        document.getElementById("sites").innerHTML = "sorry...";
      }
      
      xmlhttp.open("GET", "https://www.googleapis.com/customsearch/v1?key=AIzaSyDmj2fG7vMUR50j9n_TtYDcYHGqBw0eB_s&cx=013886194400589540356:b4shtzahg_0&q="+wr.id('search-main').value, true);
    xmlhttp.send();
  };




//Scrolling Function
function scroll(e) 
{
  if (e.keyCode == 40) 
  {
    window.scrollBy(0, 20);
  }

  if (e.keyCode == 38) 
  {
    window.scrollBy(0, -20);
  }
}





function showmore(title) 
{

   
  wr.id('bod').style.overflowY ="visible";

  wr.id('know-more-detail').innerHTML = "";
  var showmorebox = wr.id('know-more-popup');
  var showmoredetail = wr.id('know-more-detail');
  var showmorenews = wr.id('know-more-news');
  var coverfired = wr.id('backcover');

  window.scrollTo(0, 0);

  backcover.style.display = "block";

  wr.id('loading-more').style.display = "block";

  var extraTag = document.createElement('script');
  extraTag.src = 'https://en.wikipedia.org/w/api.php?format=json&action=query&prop=revisions&redirects=1&callback=getMoreData&rvprop=content&rvparse&titles='+title;
  

  document.body.appendChild(extraTag);
  showmorebox.style.display = "block";
  showmoredetail.style.display = "none";
  showmorenews.style.display = "none";
  wr.id("portal").style.display = "none";
  wr.id('pageMotion').style.display = "none";
  showmorebox.style.height = window.innerHeight+"vw";
  return false;


}

function showinfobox(title) 
{


   
  var extraTag = document.createElement('script');
  extraTag.src = 'https://en.wikipedia.org/w/api.php?format=json&action=query&prop=revisions&rvsection=0&redirects=1&callback=getinfobox&rvprop=content&rvparse&titles='+title;
  document.body.appendChild(extraTag);
  return false;
}

function moreNews(title) 
{
  //var Srvalue = window.scrollY;

  //for (var i = Srvalue; i > 0; ) {
   
    
    //setTimeout(function(){  i--;}, 300);

    window.scrollTo(0, 0);

 // }

  

  var showmorebox = wr.id('know-more-popup');
  var showmoredetail = wr.id('know-more-detail');
  var showmorenews = wr.id('know-more-news');
  var coverfired = wr.id('backcover');

  backcover.style.display = "block";

  wr.id('loading-more').style.display = "block";

  var extraTag = document.createElement('script');
  extraTag.src = 'https://en.wikinews.org/w/api.php?action=query&format=json&callback=getNewsData&prop=extracts%7Cpageimages&pilicense=any&pithumbsize=320&titles='+title;
  

  document.body.appendChild(extraTag);
  showmorebox.style.display = "block";
  showmoredetail.style.display = "none";
  showmorenews.style.display = "none";
  wr.id("portal").style.display = "none";
  wr.id('pageMotion').style.display = "none";
  showmorebox.style.height = window.innerHeight+"vw";
}

var getMoreData = function(moreData) 
{



  wr.id('loading-more').style.display = "none";
  wr.id('know-more-detail').style.display = "block";
  wr.id('know-more-news').style.display = "none";
  wr.id('pageMotion').style.display = "block";
  wr.id("portal").style.display = "block";

  var x;

  for (x in moreData.query.pages) {


    
     
       for(star in moreData.query.pages[x].revisions[0]){

        var titleM = moreData.query.pages[x].title;
        var titleN = titleM.replace(/'/g,"%27");
        var titleF = titleN.replace(/ /g,"%20");
        
        var spots = moreData.query.pages[x].revisions[0][star];
        var gar = spots.replace(/\/\/upload/g, 'https:upload');
        var gar0 = gar.replace(/class="image" title/g, 'class="image" total');
        var garb1 = gar0.replace(/" class="extiw/g, '');
        var garb2 = garb1.replace(/" title/g, '" title');
        var garb3 = garb2.replace(/" class="mw-redirect/g, '');
        var places = garb3.replace(/ href=\"\/wiki\//g, ' onclick="return showmore(this.innerHTML)" href="http://heylle.com/?tp=');

       
       wr.id('know-more-detail').innerHTML += places+'<br><br>';
       wr.id('portal').innerHTML = '<a href="http://en.wikipedia.org/wiki/'+moreData.query.pages[x].title+'" target="_blank">Go to Wikipedia</a>';
       
        if (window.location.href.indexOf("?tp="+titleF) == '-1'){
           history.pushState({state:1}, "State 1", "?tp="+titleF);
          // alert(window.location.href.indexOf("?tp="+titleF));
          // alert("?tp="+titleF);
        }

       }

  }
   
}

var getinfobox = function(moreData) 
{




  var x;

  for (x in moreData.query.pages) {


    
     
       for(star in moreData.query.pages[x].revisions[0]){

        var titleM = moreData.query.pages[x].title;
        var titleN = titleM.replace(/'/g,"%27");
        var titleF = titleN.replace(/ /g,"%20");
        
        var spots = moreData.query.pages[x].revisions[0][star];
        var gar = spots.replace(/\/\/upload/g, 'https:upload');
        var gar0 = gar.replace(/class="image" title/g, 'class="image" total');
        var garb1 = gar0.replace(/" class="extiw/g, '');
        var garb2 = garb1.replace(/" title/g, '" title');
        var garb3 = garb2.replace(/" class="mw-redirect/g, '');
        var places = garb3.replace(/ href=\"\/wiki\//g, ' onclick="return showmore(this.innerHTML)" href="http://heylle.com/?tp=');

      wr.id('infobox').innerHTML += places+'<br><br>';
       

       }

  }

  infoboxfilter();
   
}

function infoboxfilter(){



  var list = wr.id("infobox");


  var tablebox = list.getElementsByTagName("TR");

  //alert(tablebox.length);

  if (!tablebox[0]) {
    wr.id('infobox').style.display = "none";
    wr.id('moveM').style.width = "70vw";
    wr.id('moveM').style.fontSize = "1.5vw";
    wr.id('moveM').style.lineHeight = "2vw";
  }

  if (tablebox.length > 7 ) {

   list.innerHTML = "<table><tr>"+tablebox[1].innerHTML+'</tr><tr>'+tablebox[2].innerHTML+'</tr><tr>'+tablebox[3].innerHTML+'</tr><tr>'+tablebox[4].innerHTML+'</tr><tr>'+tablebox[5].innerHTML+'</tr><tr>'+tablebox[6].innerHTML+'</tr><tr>'+tablebox[7].innerHTML+"</tr></table>";

  }else if( tablebox.length == 7){
         list.innerHTML = "<table><tr>"+tablebox[1].innerHTML+'</tr><tr>'+tablebox[2].innerHTML+'</tr><tr>'+tablebox[3].innerHTML+'</tr><tr>'+tablebox[4].innerHTML+'</tr><tr>'+tablebox[5].innerHTML+'</tr><tr>'+tablebox[6].innerHTML+"</tr></table>";
  }else if( tablebox.length == 6){
         list.innerHTML = "<table><tr>"+tablebox[1].innerHTML+'</tr><tr>'+tablebox[2].innerHTML+'</tr><tr>'+tablebox[3].innerHTML+'</tr><tr>'+tablebox[4].innerHTML+'</tr><tr>'+tablebox[5].innerHTML+"</tr></table>";
  }else if( tablebox.length == 5){
         list.innerHTML = "<table><tr>"+tablebox[1].innerHTML+'</tr><tr>'+tablebox[2].innerHTML+'</tr><tr>'+tablebox[3].innerHTML+'</tr><tr>'+tablebox[4].innerHTML+"</tr></table>";
  }else if( tablebox.length == 4){

        list.innerHTML = "<table><tr>"+tablebox[1].innerHTML+'</tr><tr>'+tablebox[2].innerHTML+'</tr><tr>'+tablebox[3].innerHTML+"</tr></table>";
  }else if( tablebox.length == 3){
         list.innerHTML = "<table><tr>"+tablebox[1].innerHTML+'</tr><tr>'+tablebox[2].innerHTML+"</tr></table>";
  }

  
  

}





function closeExtra(el) 
{ 
  history.pushState({state:1}, "State 1", "?qr="+wr.id('search-main').value);
  // window.history.back();
//   document.title = "Heylle | Quick Knowledge";
  window.scrollTo(0, 0);
  wr.id(el).style.display = "none";
  wr.id('know-more-popup').style.display = "none";
  wr.id('backcover').style.display = "none";
  wr.id('know-more-detail').innerHTML = "";
  wr.id('know-more-news').innerHTML = "";
  wr.id('know-more-news').style.display = "none";
  wr.id('know-more-detail').style.display = "none";
  wr.id('player').style.display = "none";
  wr.id('player').innerHTML = "";
}

function resetText(elSearch) 
{

  wr.id(elSearch).value = '';
  wr.id("loading").style.display = "none";
}

function about(){

  window.location.assign("index.php");

  // wr.id('bod').style.overflowY ="visible";
  // wr.id("output").style.innerHTML = "";
  // wr.id("output").style.display = "none";
  // wr.id("RichWIki").style.display = "none";
  // wr.id("about_Section").style.width = "100vw";
  
  //     if (screen.width <= 600) {
  //         wr.id("about_Section").style.height = "50vw";
  //     }

  //     else{
  //         wr.id("about_Section").style.height = "25vw";
  //     }

  // wr.id("about_Section").style.borderRadius = "0";
  // wr.id("about_Section").style.backgroundColor = "transparent"; 

}

function deabout(){
  wr.id("about_Section").style.width = "0";
     wr.id("about_Section").style.height = "0";
  wr.id("about_Section").style.borderRadius = "0";
  wr.id("about_Section").style.backgroundColor = "white"; 
}
