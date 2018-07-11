var i=0;
 
function timedCount()
{
   if (i == 10) return;
   i=i+1;
   postMessage(i);
   setTimeout("timedCount()",5);
}
 
timedCount();