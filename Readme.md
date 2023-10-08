# FAjax

Userscript to make FA use AJAX/JS fetch for more operations 

Features:

* `+ Fav`/`- Fav` does not need to reload page
  * note: you still need to reload if you want to unfav after faving and the other way around, but this isn't the most common case so it's okay until i work on it
* Notifications are now polled for every five minutes and a count is shown in the page title
  * You can make it poll for more notififactions, but don't recommend going over 20 fetches per hour or 500 a day or FA might be angry at you
