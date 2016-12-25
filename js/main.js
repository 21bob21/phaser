//this game will have only 1 state
var GameState = {

  //initiate some game-level settings
  init: function() {
    //scaling options
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
  },
  //load the game assets before the game starts
  preload: function() {
    this.load.image('background', 'assets/images/background.png'); 
	this.load.image('player', 'assets/images/player.png?v=1');
	this.load.image('block', 'assets/images/wallblock.jpg');
	this.load.image('spike', 'assets/images/spike.png');
	this.load.image('coin', 'assets/images/coin.png');
  },
  //executed after everything is loaded
  create: function() {      
    this.background = this.game.add.sprite(0, 0, 'background');
	this.spikea = this.game.add.sprite(160, 595, 'spike');
	this.spikea.scale.setTo(0.08,0.08);
	this.spikeb = this.game.add.sprite(180, 595, 'spike');
	this.spikeb.scale.setTo(0.08,0.08);
	this.player = this.game.add.sprite(0, 550, 'player');
	this.player.scale.setTo(0.08);
	this.platformup = this.game.add.sprite(0,-25,'block');
	this.platformup.scale.setTo(10,0.05);
	this.platformdown = this.game.add.sprite(0,615,'block');
	this.platformdown.scale.setTo(10,0.05);
	this.platformleft = this.game.add.sprite(-25,0,'block');
	this.platformleft.scale.setTo(0.05,15);
	this.platformright = this.game.add.sprite(335,0,'block');
	this.platformright.scale.setTo(0.05,15);
	this.platforms = this.add.physicsGroup();
	this.objects = this.add.physicsGroup();
	this.objectsleft = this.add.physicsGroup();
	this.objectsup = this.add.physicsGroup();
	this.objectsright = this.add.physicsGroup();
	this.objectsdown = this.add.physicsGroup();
	this.objects.add(this.objectsright);
	this.objects.add(this.objectsup);
	this.objects.add(this.objectsleft);
	this.objects.add(this.objectsdown);
	this.platforms.add(this.platformup);
	this.platforms.add(this.platformdown);
	this.platforms.add(this.platformleft);
	this.platforms.add(this.platformright);
	game.physics.startSystem(Phaser.Physics.ARCADE);
	game.world.enableBody = true;
    game.physics.arcade.enable(this.player);
	game.physics.arcade.enable(this.platforms);
	game.physics.arcade.enable(this.objects);
	this.platforms.setAll('body.allowGravity', false);
	this.platforms.setAll('body.immovable', true);

	// Add gravity to make it fall
	this.player.body.gravity.y = 300;
    this.cursor = game.input.keyboard.createCursorKeys();
    this.player.body.collideWorldBounds = true;
	jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	this.player.body.velocity.setTo(180,100);
	
  },
	update: function(){
		console.log(this.player.body.gravity.x);
		game.physics.arcade.collide(this.player, this.platforms);
		game.physics.arcade.collide(this.player, this.objects);
		if(this.player.body.touching.right){
			if(this.player.body.gravity.y == 1480 || this.player.body.touching.down){
					console.log(this.player.body.x);
					this.player.body.gravity.x = 1480;
					this.player.body.gravity.y = 0;
					this.player.body.velocity.setTo(0,-190);
			}else if(this.player.body.touching.up){
				if(this.player.body.gravity.x == 1480 || this.player.body.touching.right){
					console.log("topright");
					console.log(this.player.body.x);
					this.player.body.gravity.x = 0;
					this.player.body.gravity.y = -1480;
					this.player.body.velocity.setTo(-190,0);
				}
			}
		}else if(this.player.body.touching.up){
			if(this.player.body.gravity.x == 1480 || this.player.body.touching.right){
				console.log("topright");
				console.log(this.player.body.x);
				this.player.body.gravity.x = 0;
				this.player.body.gravity.y = -1480;
				this.player.body.velocity.setTo(-190,0);
			}else if(this.player.body.touching.left){
				if(this.player.body.gravity.y == -1480 || this.player.body.touching.up){
					console.log(this.player.body.x);
					this.player.body.gravity.x = -1480;
					this.player.body.gravity.y = 0;
					this.player.body.velocity.setTo(0,190);
				}
			}
		}else if(this.player.body.touching.left){
			if(this.player.body.gravity.y == -1480 || this.player.body.touching.up){
				console.log(this.player.body.x);
				this.player.body.gravity.x = -1480;
				this.player.body.gravity.y = 0;
				this.player.body.velocity.setTo(0,190);
			}else if(this.player.body.touching.down){
			if(this.player.body.gravity.x == -1480 || this.player.body.touching.left){
				console.log(this.player.body.x);
				this.player.body.gravity.x = 0;
				this.player.body.gravity.y = 1480;
				this.player.body.velocity.setTo(190,0);
			}
		}else if(this.player.body.touching.down){
			if(this.player.body.gravity.x == -1480 || this.player.body.touching.left){
				console.log(this.player.body.x);
				this.player.body.gravity.x = 0;
				this.player.body.gravity.y = 1480;
				this.player.body.velocity.setTo(190,0);
			}else if(this.player.body.touching.right){
				if(this.player.body.gravity.y == 1480 || this.player.body.touching.down){
						console.log(this.player.body.x);
						this.player.body.gravity.x = 1480;
						this.player.body.gravity.y = 0;
						this.player.body.velocity.setTo(0,-190);
				}
			}
		}
		}
		
		
		if(jumpButton.isDown){
			if(this.player.body.touching.down){
				this.player.body.gravity.x = 0;
				this.player.body.gravity.y = 1480;
				this.player.body.velocity.setTo(190,-400);
			}else if(this.player.body.touching.right){
				this.player.body.gravity.x = 1480;
				this.player.body.gravity.y = 0;
				this.player.body.velocity.setTo(-400,-190);
			}else if(this.player.body.touching.up){
				this.player.body.gravity.x = 0;
				this.player.body.gravity.y = -1480;
				this.player.body.velocity.setTo(-190,400);
			}else if(this.player.body.touching.left){
				this.player.body.gravity.x = -1480;
				this.player.body.gravity.y = 0;
				this.player.body.velocity.setTo(400,190);
			}
		}
			
  
}

};

//initiate the Phaser framework
var game = new Phaser.Game(360, 640, Phaser.AUTO);

game.state.add('GameState', GameState);
game.state.start('GameState');