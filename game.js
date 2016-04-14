
		// Seán Collum - 12315886
		//Global Variables.
		var canvas = document.getElementById("game");
		var ctx = canvas.getContext("2d");
		var x = 225;
		var y = 300;
		var dx = Math.floor(Math.random()*5) + 1;
		dx *= Math.floor(Math.random()*2) == 1 ? 1 : -1;
		var dy = Math.floor(Math.random()*5) + 1;
		dy *= Math.floor(Math.random()*2) == 1 ? 1 : -1;
		var ballRadius = 15;
		var goalkeeperHeight = 10;
		var goalkeeperWidth = 75;
		var goalkeeperX = 185;
		var goalkeeperY = 80;
		var playerHeight = 10;
		var playerWidth = 75;
		var playerX = 185;
		var playerY = 520;

		var rightPressed = false;
		var leftPressed = false;
		var upPressed = false;
		var downPressed = false;

		var goalkeeperrightPressed = false;
		var goalkeeperleftPressed = false;
		var goalkeeperupPressed = false;
		var goalkeeperdownPressed = false;

		var redGoalHeight = 80;
		var redGoalWidth = 150;
		var redGoalX = 150;
		var redGoalY = 0;

		var blueGoalWidth = 150;
		var blueGoalHeight = 80;
		var blueGoalX = 150;
		var blueGoalY = 520;

		var blueScore = 0;
		var redScore =0;

		var blueGoal = 0;
		var redGoal = 0;

		var goal = new Audio("goalnoise.mp3");
		var background = new Audio("background.mp3");
		var gameOver = new Audio("gameover.mp3");




		


		function drawBackground()
		{
			//draws the grey rectangle with the circle and half way line.
			var canvas = document.getElementById("background");
			var ctx = canvas.getContext("2d");
			ctx.fillStyle = "#d2d1d1";
			ctx.fillRect(0, 0, canvas.width, canvas.height);
			ctx.beginPath();
			ctx.arc(225, 300, 70, 0, Math.PI*2, false);
			ctx.StrokeStyle = "#000000";
			ctx.stroke();
			ctx.closePath();
			ctx.beginPath();
		    ctx.moveTo(0, 300);
		    ctx.lineTo(600, 300);
		    ctx.stroke();
		}
		 
		function drawBall()
		{
			//draws a ball in the centre of the field.
			ctx.clearRect(0, 0, canvas.width, canvas.height);
	  		var ball = new Image();
	  		ctx.beginPath();
	        ctx.fillStyle = "white";
	        ctx.strokeStyle="black";
	        ctx.arc(x, y, ballRadius, 0, Math.PI*2, true);
	        ctx.fill();
	        ctx.stroke();
	        ctx.closePath();
	        // if it collides with either side, bounce off
	        if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) 
	        {
		        dx = -dx;
		    }
		    //if it collides with top or bottom, bounce of
		    if(y + dy > canvas.height-ballRadius || y + dy < ballRadius) 
		    {
		        dy = -dy;
		    }
		   
		    x += dx;
		    y += dy;
		}

		function drawBlueGoal()
		{
			//draws the bottom goal line
			ctx.beginPath();
		    ctx.rect(redGoalX, redGoalY, redGoalWidth, redGoalHeight);
		    ctx.strokeStyle = "#000000";
		    ctx.stroke();
		    ctx.closePath();

		    // if all the ball is inside the goal rectangle then give one score to the red team
		     if(x-ballRadius>blueGoalX && x+ballRadius<blueGoalX+blueGoalWidth && y-ballRadius>blueGoalY && y+ballRadius<blueGoalY+blueGoalHeight)
		     {
		     		
		     		redGoal++
		     		redScore = redScore+redGoal;
		     		if(redScore >=10)//end game, first to 10.
		     		{
		     			background.pause();
		     			gameOver.play();
		     			alert("RED TEAM WINS!");
            			document.location.reload();
		     		}
		     		else
		     		{
		     		restart();
		     		}
		     }

		}


		function restart() 
		{
			//when a goal is scored, reset the ball to the middle of the field and send it it in a random direction.
			goal.play();
			x = 225;
			y = 300;
			blueGoal = 0;
			redGoal = 0;
			dx = Math.floor(Math.random()*5) + 1;
			dx *= Math.floor(Math.random()*2) == 1 ? 1 : -1;
			dy = Math.floor(Math.random()*5) + 1;
			dy *= Math.floor(Math.random()*2) == 1 ? 1 : -1;
		}


		function drawRedGoal()
		{
			ctx.beginPath();
		    ctx.rect(blueGoalX, blueGoalY, blueGoalWidth, blueGoalHeight);
		    ctx.strokeStyle = "#000000";
		    ctx.stroke();
		    ctx.closePath();

		    // if all the ball is inside the goal rectangle then give one score to the blue team
		    if(x-ballRadius>redGoalX && x+ballRadius<redGoalX+redGoalWidth && y-ballRadius>redGoalY && y+ballRadius<redGoalY+redGoalHeight)
		     {
		     		blueGoal++
		     		blueScore = blueScore+blueGoal;
		     		if(blueScore >=10) //end game is first to 10
		     		{
		     			background.pause();
		     			gameOver.play();
		     			alert("BLUE TEAM WINS!");
            			document.location.reload();
		     		}
		     		else
		     		{
		     		restart();
		     		}

		     }
		}

		function drawgoalkeeper() 
		{
			//draws the top goal line.
		    ctx.beginPath();
		    ctx.rect(goalkeeperX, goalkeeperY, goalkeeperWidth, goalkeeperHeight);
		    ctx.fillStyle = "#ff0000";
		    ctx.fill();
		    ctx.closePath();

		    // check to see if any of the buttons are pressed
		    if(goalkeeperrightPressed && goalkeeperX < canvas.width-goalkeeperWidth) 
		    {
		        goalkeeperX += 4;
		    }
		    else if(goalkeeperleftPressed && goalkeeperX > 0) 
		    {
		        goalkeeperX -= 4;
		    }

		    if(goalkeeperupPressed && goalkeeperY > 0) 
		    {
		        goalkeeperY -= 4;
		    }
		    else if(goalkeeperdownPressed && ( goalkeeperY <300 -goalkeeperHeight)) //halfway line
		    {
		        goalkeeperY += 4;
		    }

		    //if the ball hits the red player then collide and bounce off in the other direction
		    if(x > goalkeeperX && x < goalkeeperX+goalkeeperWidth && y > goalkeeperY && y < goalkeeperY+goalkeeperHeight+ballRadius) 
		    {
                    dy = -dy;
            }
            

		}

		function drawPlayer() 
		{
		    ctx.beginPath();
		    ctx.rect(playerX, playerY, playerWidth, playerHeight);
		    ctx.fillStyle = "#000cff";
		    ctx.fill();
		    ctx.closePath();

		    // check to see if any of the buttons are pressed

		    if(rightPressed && playerX < canvas.width-playerWidth) 
		    {
		        playerX += 4;
		    }
		    else if(leftPressed && playerX > 0) 
		    {
		        playerX -= 4;
		    }

		    if(upPressed && playerY < canvas.height-playerHeight) 
		    {
		        playerY += 4;
		    }
		    else if(downPressed && (playerY < 600 && playerY >300)) //halfway line
		    {
		        playerY -= 4;
		    }

		    //if the ball hits the blue player then collide and bounce off in the other direction
		    if(x > playerX && x < playerX+playerWidth && y > playerY-ballRadius && y  < playerY+playerHeight) 
		    {
                    dy = -dy;
            }
            
		}

		function drawScore() 
		{
			//draws the scores onto the canvas in the top left corner.
		    ctx.font = "16px Arial";
		    ctx.fillStyle = "#0000ff";
		    ctx.fillText("Blue: "+blueScore, 10, 20);
		    ctx.font = "16px Arial";
		    ctx.fillStyle = "#ff0000";
		    ctx.fillText("Red: "+redScore, 10, 40);
		}

		
		function draw()
		{
			background.play();
			goalNoise = document.getElementById(goal);
			//draws all the objects
			drawBackground();
			drawBall();
			drawRedGoal();
			drawBlueGoal();
			drawgoalkeeper();
			drawPlayer();
			drawScore();
		}
		//listeners for the key press
		document.addEventListener("keydown", keyDownHandler, false);
		document.addEventListener("keyup", keyUpHandler, false);

		function keyDownHandler(e) 
		{
			//goalkeeper codes
			
			{
			    if(e.keyCode == 72) 
			    {
			        goalkeeperrightPressed = true;
			    }
			    else if(e.keyCode == 70) 
			    {
			        goalkeeperleftPressed = true;
			    }
			    else if(e.keyCode == 71) 
			    {
			        goalkeeperdownPressed = true;
			    }
			    else if(e.keyCode == 84) 
			    {
			        goalkeeperupPressed = true;
			    }
			}	

			//player codes
			{
				 if(e.keyCode == 39) 
			    {
			        rightPressed = true;
			    }
			    else if(e.keyCode == 37) 
			    {
			        leftPressed = true;
			    }
			    else if(e.keyCode == 38) 
			    {
			        downPressed = true;
			    }
			    else if(e.keyCode == 40) 
			    {
			        upPressed = true;
			    }
			}
		}

		function keyUpHandler(e) 
		{
			//player codes
			{
			    if(e.keyCode == 39) 
			    {
			        rightPressed = false;
			    }
			    else if(e.keyCode == 37) 
			    {
			        leftPressed = false;
			    }
			    else if(e.keyCode == 38) 
			    {
			        downPressed = false;
			    }
			    else if(e.keyCode == 40) 
			    {
			        upPressed = false;
			    }
			}

			//goalkeeper codes
			{
			    if(e.keyCode == 72) 
			    {
			        goalkeeperrightPressed = false;
			    }
			    else if(e.keyCode == 70) 
			    {
			        goalkeeperleftPressed = false;
			    }
			    else if(e.keyCode == 71) 
			    {
			        goalkeeperdownPressed = false;
			    }
			    else if(e.keyCode == 84) 
			    {
			        goalkeeperupPressed = false;
			    }
			}	

		}
		setInterval(draw, 10);