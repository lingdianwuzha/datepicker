	/**
	  * get month
	  * @param {int} [paramer] [description]
	  */
	 function get_double(paramer) {
	 	if(paramer < 0 || paramer > 31) {
	 		//page_error();
			//console.log(paramer);
	 	}
	 	return paramer >= 10 ? paramer : 0 + '' + paramer;
	 } 
	/**
     * getMonthDays
     * @param  month
     * @param  year
     * @return int
	 */
	function get_month_days(month,year) 
	{ 
		month = parseInt(month);
		year  = parseInt(year);
		var full = [1,3,5,7,8,10,12];
		var half = [4,6,9,11];
		if(in_array(month,full) !== false) {
			return 31;
		} else if(in_array(month,half) !== false) {
			return 30;
		} else {
			if(is_leap_year(year) !== false) {
				return 29;
			} else {
				return 28;
			}
		}
	}
	/**
	 * get leap year
	 * @param  year
	 * @return bool
	 */
	function is_leap_year(year)
	{
		if(year<1000 || year>3000) {
			return false;
		}
		else if((year % 4 == 0 && year % 100 !=0) || (year % 100 == 0 && year % 400 ==0)) {
			return true;
		}
		return false;
	}
	/**
	 * in_array 
	 * @param month_array [1,3,5,7,9,10]
	 * @param  value
	 * @return bool || index
	 */
	 function in_array(value,month_array)
	 {
	 	for (var i = 0; i <= month_array.length - 1; i++) {
	 		if(month_array[i] == value) {
	 			return i;
	 		}
	 	}
	 	return false;
	 }
	 /**
	  * change_pick_day_style
	  */
	 function change_pick_day_style(bx_button,color)
	 {
	 	bx_button.css("background-color",color);
	 }
	 /**
	  * add data to store
	  * @param {string} [select_day] [20160508]
	  * @param {string} [operate]
	  * @return {bool} [success return true]
	  */
	 function set_store(select_day,operate ) {
	 	/*console.log(select_day);
	 	console.log(operate);*/
	 	// console.log(in_array(select_day,pick_days));
	 	switch(operate) {
	 		case 'add':
		 		if(in_array(select_day,pick_days) === false) {
		 			pick_days.push(select_day);
		 			return true;
		 		} 
		 		return true;
	 			break;
	 		case 'del':
 				var index = in_array(select_day,pick_days);
 				if(index === false) {
 					return true;
 				} 
 				pick_days.splice(index,1);
 				return true;
	 			break;
	 		default:
	 			break;
	 	}
	 	
	 }
	 /**
	  * get store
	  */
	 function get_store(month,year)
	 {
	 	var return_dates = [];
	 	for (var i = pick_days.length - 1; i >= 0; i--) {
	 		var return_date = pick_days[i];
	 		// console.log(parseInt(year + '' + get_double(month - 1) + '' + '01'));
	 		if(parseInt(return_date) >= parseInt(year + '' + get_double(month - 1) + '' + '01') && parseInt(return_date) <= parseInt(year + '' + get_double(month+2)) + '' + '00')
	 		{
	 			return_dates.push(return_date);
	 		}
			//console.log(return_date);
	 	}
	 	/*console.log(parseInt(year + '' + get_double(month - 1) + '' + '01'));
	 	console.log(parseInt(year + '' + get_double(month+2)) + '' + '00');*/
	 	return return_dates;
	 }
	 /**
	  * page_error
	  * @return void
	  */
	 function page_error() {
	 	alert("error please reopen this page");
		window.location.href=window.location.href;
	 }
	 /**
	  * get last month days
	  */
	 function get_last_month(now_month)
	 {
	 	if(now_month == 1) {
	 		return 12 ;
	 	} else {
	 		return get_double(now_month -1);
	 	}
	 }
	 /**
	  * get year
	  */
	 function get_year(year,month=0)
	 {
	 	return month == 12 ? year-1 : year;
	 }
	 /**
	  * @param {int} [is_month] [-1,0,1]
	  * @param {int} [pick_day] [1,2,3.....31]
	  * @return {string} [20160105]
	  */
	 function get_select_day(is_month,pick_day) {
	 	switch(is_month) {
			case '-1':
				//last month
				select_day = get_year(now_year,now_month) + '' + get_last_month(now_month) + '' + get_double(pick_day);
				break;
			case '0':
				//curent month
				select_day = now_year + '' + get_double(now_month) + '' + get_double(pick_day);
				break;
			case '1':
				//next  month
				if(now_month == 12) {
					select_day = (now_year - 1) + '' + 01 + '' + get_double(pick_day);
				} else {
					select_day = now_year + '' + get_double(now_month + 1) + '' + get_double(pick_day);
				}
				break;
			/*default:
				alert("error please reopen this page");
				window.location.href=window.location.href;*/
		}
		return select_day;
	 }
	 /**
	 * add_date
	 * @param  i
	 * @return void
	 */
	function add_date(i)
	{
		//get current element
		var current_element = $('#'+i);
		//get is_pick
		var is_pick = current_element.attr('is_pick');
		//get month flag
		var is_month = current_element.attr("is_month");
		//get user pick day
		var pick_day = current_element.text();
		//type select_day
		var select_day = get_select_day(is_month,pick_day);
		/*console.log(now_year);
		console.log(now_month);
		*/
		// console.log(select_day);
		if(is_pick == 0) {
			//add this day to store
			set_store(select_day,'add');
			//set this button background-color 
			change_pick_day_style(current_element,'pink');
			//set is_pick
			current_element.attr('is_pick',1);
		} else {
			set_store(select_day,'del');
			change_pick_day_style(current_element,'');
			current_element.attr('is_pick',0);
		}
		// console.log(pick_days);
	}
	/**
	 * get_day get first day in month
	 * @param {int} [month] [description]
	 * @param {int} [year] [description]
	 * @return {int} [description]
	 */
	function get_day(month,year=0) 
	{
		if(year == 0 || year > 3000 || year < 1970) {
			//user not give year ,use global now_year
			year = now_year;
		}
		var month = month - 1; //human month
		goals = new Date();
		goals.setFullYear(year); 
		goals.setMonth(month);
		goals.setDate(1);
		day = goals.getDay();
		/*console.log(goals);
		console.log(day);*/
		 day = day == 0 ? 7 : day ;
		return day;
	}
	/**
	 * clean_all_button_color
	 * @return {void} [description]
	 */
	function clean_all_button_color()
	{
		for (var i = 1 ;i <= 42;i++) {
			 var bx_button = $('#b' + i);
			 bx_button.css('background-color','');
		}
	}
	/**
	 * change_pick_month_button_style
	 * @param {int} [month] [description]
	 */
	function change_pick_month_button_style(month) 
	{
		for (var i = 1; i <= 12; i++) {
			var mx_button = $('#m' + i);
			mx_button.css('background-color','');
			mx_button.attr('is_pick',0);
		}
		var mx_button = $('#m' + month);
		mx_button.css('background-color','#C54D11');
		mx_button.attr('is_pick',1);
	}
	/**
	 * get_start_date
	 */
	function get_start_date(current_month = now_month , current_year = current_month)
	{
		var last_month_total_days = parseInt(get_month_days(get_last_month(current_month),get_year(current_month)));
		var first_day 		= parseInt(get_day(current_month,current_month));
		var month_days 		= parseInt(get_month_days(current_month,current_month));
		var last_month_first_day = last_month_total_days - first_day + 1 + 1;
		var last_month_use_day_mount = first_day - 1;
		if(last_month_use_day_mount == 0) {
			//list last week
			last_month_first_day = last_month_total_days - 6;
			last_month_use_day_mount = 7;
		}
		return last_month_first_day;
	}
	/**
	 * get_fast_month_use
	 */
	function get_fast_month_use(month)
	{
		var first_day		= parseInt(get_day(month));
		var last_month_use_day_mount = first_day - 1;
		if(last_month_use_day_mount == 0) {
			//list last week
			last_month_use_day_mount = 7;
		}
		return last_month_use_day_mount;
	}
	/**
	 * change_month_date_view
	 */
	function change_month_date_view(last_month_days,first_day,month_days)
	{
		clean_all_button_color();
		var last_month_total_days = parseInt(last_month_days);
		var first_day		= parseInt(first_day);
		var last_month_first_day = last_month_total_days - first_day + 1 + 1;
		var month_days = parseInt(month_days);
		/*console.log(last_month_first_day);
		console.log('last_month_total_days = ' + last_month_total_days);
		console.log('first_day = ' + first_day);*/
		var last_month_use_day_mount = first_day - 1;
		if(last_month_use_day_mount == 0) {
			//list last week
			last_month_first_day = last_month_total_days - 6;
			last_month_use_day_mount = 7;
		}
		var next_month_days = 42 - month_days - last_month_use_day_mount;
		// console.log(next_month_days);
		// console.log(last_month_first_day);
		// $('#b1').text(last_month_first_day);
		//list last month days view
		for (var i = 1; i <= last_month_use_day_mount; i++) {
			bx = '#b' + i;
			bx_button = $(bx);
			day_view = parseInt(last_month_first_day+i-1);
			bx_button.text(day_view);
			bx_button.attr('is_month',-1);
			bx_button.css({'color':'#828282'});
		}
		//list all this month date
		for (var i = 1; i <= month_days; i++) {
			bx = '#b' + parseInt(i + last_month_use_day_mount);
			bx_button = $(bx);
			bx_button.text(i);
			bx_button.attr('is_month',0);
			bx_button.css('color','black');
		}
		//list next month date
		for(var i = 1; i <= next_month_days; i++) {
			bx = '#b' + parseInt(i + last_month_use_day_mount + month_days);
			bx_button = $(bx);
			bx_button.text(i);
			bx_button.attr('is_month',1);
			bx_button.css({'color':'#828282'});
		}
	}
	/**
	 * change_pick_year_button_style();
	 */
	function change_pick_year_button_style(year)
	{
		for (var i = 1; i <= 3; i++) {
			var yx_button = $('#y' + i);
			yx_button.css('background-color','');
		}
		var mx_button = $('#y' + year);
		mx_button.css('background-color','#C54D11');
	}
	/**
	 * change_picked_day
	 */
	function change_picked_day()
	{
		/*console.log(now_month);
		console.log(now_year);*/
		var need_change_select_day = get_store(now_month,now_year);
		// console.log(pick_days);
		// console.log(need_change_select_day);
		if(need_change_select_day == [])
		{
			return;
		}
		var change_day = '';
		var bx 		   = [];
		var bx_id 	   = '';
		var month_days = get_month_days(now_month,now_year);
		var last_month_days = get_month_days(get_last_month(),get_year());
		var start_date = get_start_date();
		var next_month_days = 42 - month_days - get_fast_month_use();
		for (var i = need_change_select_day.length - 1; i >= 0; i--) {
			change_day = need_change_select_day[i];
			change_day = change_day.slice(-4);
			change_day = parseInt(change_day);
			if(parseInt(((now_month - 1) + '' + start_date)) <= change_day && change_day <= parseInt((now_month - 1) + '' +last_month_days)) {
				//
				bx_id = parseInt(change_day - parseInt(((now_month - 1) + '' + start_date)));
				bx.push('#b' + bx_id);
			} else if(parseInt(now_month + '' + '01') <= change_day && change_day <= parseInt(now_month + '' + month_days)) {
				bx_id = parseInt(get_fast_month_use(now_month) + parseInt(change_day - parseInt(now_month + '00')));
				bx.push('#b' + bx_id);
			} else if((change_day > parseInt(now_month + '' + month_days)) && (change_day <= parseInt((now_month +1) + '' + next_month_days))){
				bx_id = parseInt(get_fast_month_use() + month_days + (parseInt(change_day - parseInt((now_month +1) + '' +'00'))));
				bx.push('#b' + bx_id);
			}
		}
		return bx;
	}
	/**
	 * change_picked_date_button_style
	 * */
	function change_picked_date_button_style(bx)
	{
		for(var i = bx.length ; i >= 0; i--) {
			$(bx[i]).css('background-color','pink');
		}
	}
	/**
	 * change_month
	 */
	function change_month(i)
	{
		//get first day in this month 1,2,3,4,5,6,7
		var first_day = get_day(i);
		//get last month days 31,30,29,28
		var last_month_days = get_month_days(get_last_month(i),get_year(i,now_year));
		// console.log(get_month_days(4,2017));
		//get pick month days
		var this_month_days = get_month_days(i,now_year);
		// change all data view
		change_month_date_view(last_month_days,first_day,this_month_days);
		// change style
		change_pick_month_button_style(i);
		//update gloabl veriable
		now_month = i;
		//console.log(i);
		change_picked_date_button_style(change_picked_day());
		//console.log(change_picked_day());
	}
	/**
	 * change_year
	 */
	function change_year(i)
	{
		var yx = $("#y" + i);
		var new_now_year = yx.text();
		var first_day = get_day(now_month,new_now_year);
		var last_month_days = get_month_days(get_last_month(now_month),get_year(now_month,new_now_year));
		var this_month_days = get_month_days(now_month,now_year);
		change_month_date_view(last_month_days,first_day,this_month_days);
		// console.log(now_month);
		change_pick_month_button_style(now_month);
		change_pick_year_button_style(i);
		//console.log(new_now_year);
		now_year = new_now_year;
	}
	/**
	 * post data to server
	 */
	function post_data()
	{
		// console.log(pick_days);
		// create ajax object
		var variable = new XMLHttpRequest()
		var url = 'http://localhost/get_post_data.php';
		var pick_dates = 'p=' + pick_days.join(',');
		url = url + '?' + pick_dates + '&rand=' + Math.random();
		variable.open('GET',url,true);
		variable.onreadystatechange=function(){
			$('#test').text(variable.responseText);
		}
		variable.send(url);
		console.log(url);
		console.log(pick_dates);
	}