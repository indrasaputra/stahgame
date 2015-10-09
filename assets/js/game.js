	var stone;
	var computerHasMove;
	var computerMove;
	var numberOfChoices;
	var choices = [];
	var isTaken = [false,false,false,false,false,false,false,false,false,false,false];
	var state = [];
	var playerMoves;
	var computerMoves;
	
	$(function() {
		initGame();
	});

	function initGame()
	{
		isTaken = [false,false,false,false,false,false,false,false,false,false,false];
		
		stone = Math.floor(Math.random()*81+20);
		$('#stone').html(stone);


		choices = [];
		numberOfChoices = Math.floor(Math.random()*3+3);
		choices.push(1);
		for(var i=0; i<numberOfChoices-1; i++)
		{
			var take = Math.floor(Math.random()*9+2);
			if(!isTaken[take])
			{
				choices.push(take);
				isTaken[take] = true;
			}
			else
			{
				i--;
			}
		}
		for(var i=0; i<numberOfChoices; i++)
		{
			$('#number-'+choices[i]).removeClass('disabled');
		}

		calculateAnswer();

		$('#message').html("Thinking...");
		$('#playerMoves').html('');
		$('#computerMoves').html('');
	}

	$('#playButton').click(function(){
		initGame();
		$('#endGameModal').modal('hide');
		$('#startGameModal').modal('show');
	});

	function computerFirst()
	{
		computerHasMove = false;
		computerMove = 1;
		for(var i=0; i<numberOfChoices; i++)
		{
			if(!state[stone-choices[i]])
			{
				computerHasMove = true;
				computerMove = choices[i];
			}
		}

		if(computerHasMove)
		{
			stone -= computerMove;		
		}
		else
		{
			if(!(stone&1))
			{
				var index = Math.floor(Math.random()*choices.length);
				computerMove = choices[index];
			}
			stone -= computerMove;
		}
		computerMoves = $('#computerMoves').html();
		if(computerMoves == '')
		{
			$('#computerMoves').html(computerMoves + computerMove);
		}
		else
		{
			$('#computerMoves').html(computerMoves + ', ' + computerMove);
		}

		$('#stone').html(stone);
		validateChoices();

		if(stone == 0)
		{
			endOfGame(1);
			return;
		}
	}

	function calculateAnswer()
	{
		state = [];
		state.push(false);

		for(var i=1; i<=stone; i++)
		{
			state.push(false);
			for(var j=0; j<numberOfChoices; j++)
			{
				if(i>=choices[j] && !state[i-choices[j]])
				{
					state[i] = true;
					break;
				}
			}
		}
	}

	function showMessage(_player)
	{
		if(_player == 0)
		{
			if(state[stone])
			{
				$('#message').html("Hmm... I don't feel good today. You might beat me. But, I am not going to give up so easily.");
			}
			else
			{
				$('#message').html("I feel good today. I guarantee you don't have a chance to beat me. But, you should try your best first.");
			}
		}
		else if(_player == 1)
		{
			if(state[stone])
			{
				$('#message').html("I feel good today. I guarantee you don't have a chance to beat me. But, you should try your best first.");
			}
			else
			{
				$('#message').html("Hmm... I don't feel good today. You might beat me. But, I am not going to give up so easily.");
			}
		}
	}

	function validateChoices()
	{
		var deprecatedChoices = [];
		for(var i=0; i<numberOfChoices; i++)
		{
			if(choices[i] > stone)
			{
				deprecatedChoices.push(choices[i]);
			}
		}
		for(var i=0; i<deprecatedChoices.length; i++)
		{
			var index = choices.indexOf(deprecatedChoices[i]);
			choices.splice(index,1);
			disableNumber('#number-'+deprecatedChoices[i]);
		}
		numberOfChoices -= deprecatedChoices.length;
	}

	$('.number').click(function(){
		stone = parseInt($('#stone').html());
		var number = parseInt(this.value);
		playerMoves = $('#playerMoves').html();
		if(playerMoves == '')
		{
			$('#playerMoves').html(playerMoves + number);
		}
		else
		{
			$('#playerMoves').html(playerMoves + ', ' + number);
		}

		stone -= number;
		$('#stone').html(stone);
		validateChoices();

		if(stone == 0)
		{
			endOfGame(0);
			return;
		}

		computerHasMove = false;
		computerMove = 1;
		for(var i=0; i<numberOfChoices; i++)
		{
			if(!state[stone-choices[i]])
			{
				computerHasMove = true;
				computerMove = choices[i];
			}
		}

		if(computerHasMove)
		{
			stone -= computerMove;		
		}
		else
		{
			if(!(stone&1))
			{
				var index = Math.floor(Math.random()*choices.length);
				computerMove = choices[index];
			}
			stone -= computerMove;
		}
		computerMoves = $('#computerMoves').html();
		if(computerMoves == '')
		{
			$('#computerMoves').html(computerMoves + computerMove);
		}
		else
		{
			$('#computerMoves').html(computerMoves + ', ' + computerMove);
		}

		$('#stone').html(stone);
		validateChoices();

		if(stone == 0)
		{
			endOfGame(1);
			return;
		}
	});

	function disableNumber(_number)
	{
		$(_number).addClass('disabled');
	}

	function endOfGame(_player)
	{
		if(_player == 0)
		{
			$('#resultMessage').html('<h3><b>You Win!</b></h3><br/>Congratulations for taking the last stone!');
		}
		else if(_player == 1)
		{
			$('#resultMessage').html('<h3><b>Cipio Wins!</b></h3><br/>Better try again next time and good luck!');
		}
		$('#endGameModal').modal('show');
	}

