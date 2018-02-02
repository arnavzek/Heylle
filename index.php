<!DOCTYPE html>
<html>
<head>

  <meta name="apple-mobile-web-app-capable" content="yes">
        
  <meta name="mobile-web-app-capable" content="yes">

  <meta name='viewport' content='width=device-width, initial-scale=1.0, user-scalable=0' >

  <meta charset="UTF-8">
      
  <meta name="description" content="Heylle, is where you get simplified information about every kind of topic, event or personality in a super instant and easy way.">
      
  <meta name="theme-color" content="#389cc3" data-keep="true">
      
  <meta property="og:image" content="images/logo.png" />
  <meta property="og:image:type" content="images/image/png" />
      
  <meta property="og:title" content="Heylle.com | Quick Knowledge" />
  <meta property="og:description" content="Heylle, is where you get simplified information about every kind of topic, event or personality in an instant and easy way." />
      
  <meta name="author" content="Arnav Singh & Saurav Anand">
      
  <link rel="icon" href="images/logo.png" sizes="16x16" type="image/png">
  <link rel="stylesheet" type="text/css" href="main.css">
  
  
  <?php
   
    if(isset($_GET['qr'])) {
        $query = $_GET['qr'];
  }

    else  if(isset($_GET['tp'])) {
        $topicM = $_GET['tp'];
  }else{
    $query = NULL;
    $topicM = NULL;
  }



  ?>

  
      
  <title>Heylle | Quick Knowledge</title>

  <script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-90406803-1', 'auto');
  ga('send', 'pageview');

</script>

</head>

<body id="bod"  onkeydown="scroll(event)" onload="CorrectURL()"  onhashchange="" >


<div id="backcover" onclick="closeExtra('player')" ></div>
<center>
<div id="know-more-popup">

  <div id="know-more-detail">
  

   </div>

     <div id="know-more-news">
  

   </div>

   <div id="portal"> </div>
  <img src="images/spin.svg" id="loading-more">
  
  <div id="pageMotion">
  <button type="button" onclick="closeExtra('know-more-popup')" id="closeExtra2">&times;</button>
</div>

</div>
</center>

<center>

  <div id="circular">

<nav id="navigation">
  <img src="images/heylle.png" id="hey1" onclick="about()"><br>
  <img src="images/heylleTypo.png" id="hey2" >
</nav>


  <div id="main-input">
   <input type="Search" placeholder="Let's explore..." class="search_main" id="search-main" onkeydown="MainEnter(event)" value="<?php echo($query) ?>" 
    autofocus="true">
   <svg id='search-svg' onclick="MainClick()" viewBox="0 0 24 24">
      <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z">   
      </path>
    </svg>
   </div>

 </div>

</center>

   <div id="boundry">

    <center>

      <div id="smartAns"></div>

   <div id="wikipedia">

  <div id="RichWIki"><p id="output-R"></p> </p></div> <article id="output">
  </article><br>

  </div>

   </center>

  <p id="Videos"></p>

  <div id="player"></div>

  <br>


  <div id="sites"></div>

 

  </div>



<center>

  <div id="about_Section">
      
     <hr>

      <div id="logo">
         <img src="images/h.svg">
       </div>
      <div id="heylle_info">
        we believe in simplicity.<br> so, we made exploring knowledge simpler and better <br>| An encyclopedia of everything |    
      </div>

      <hr id="rule">

      <div id="guys">
        <div id="arnav">
          <a target="_blank" href="https://twitter.com/itsarnavsingh">Arnav Singh</a>
        </div>
        <div id="saurav">
          <a target="_blank" href="https://www.facebook.com/srvtheone">Saurav Anand</a>
        </div>
      </div>
  </div>
  <img src="images/spin.svg" id="loading" style="display: none;">
</center>

<div id="home-bar">
  <div id="dots">
<img src="images/menu.png" id="menuimg">

      

  <ul id="list">
    <li><a  target="_blank" href="https://www.facebook.com/HeylleOfficial">Facebook</a></li>
    <li><a  target="_blank" href="https://twitter.com/heylleofficial">Twitter</a></li>
    <li><a   href="about" >About</a></li>
  </ul>





  </div>
</div>



<script type="text/javascript" src="main.js"></script>

<script type="text/javascript" >

var TopicEn = "<?php echo $topicM ?>";

function TitleChange() {
  document.title = "<?php echo $topicM ?>" + " - Heylle";
}
  

</script>

<script>
<?php

if(isset($_GET['qr']))
{
  echo('MainClick();');
}

if(isset($_GET['tp']))
{
  echo('showmore(TopicEn);');
  echo('TitleChange();'); 
}

?>
</script>

</body>
</html>
