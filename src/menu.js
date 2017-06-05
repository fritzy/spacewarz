const Pixi = require('pixi.js');
const Scene = require('./scene');
const Starfield = require('./starfield');
const Game = require('./game');
const Tween = require('tween.js');

class Menu extends Scene {

  start() {

    this.sf = new Starfield(this);
    this.bg = new Pixi.Sprite(this.resources.menu.texture);
    this.stage.addChild(this.bg);

    this.startb = new Pixi.Graphics();
    this.startb.lineStyle(4, 0xFFFFFF);
    this.startb.drawRect(0, 0, 130, 43);
    this.startb.position.set(512, 290)
    this.stage.addChild(this.startb);
    this.startb.interactive = true;
    this.startb.hitArea = new Pixi.Rectangle(0, 0, 130, 43);

    this.soundb = new Pixi.Graphics();
    this.soundb.lineStyle(2, 0xFFFFFF);
    this.soundb.drawRect(0, 0, 17, 17);
    this.soundb.position.set(525, 372)
    this.stage.addChild(this.soundb);
    this.soundb.interactive = true;
    this.soundb.hitArea = new Pixi.Rectangle(0, 0, 17, 17);

    this.gravb = new Pixi.Graphics();
    this.gravb.lineStyle(2, 0xFFFFFF);
    this.gravb.drawRect(0, 0, 17, 17);
    this.gravb.position.set(525, 396)
    this.stage.addChild(this.gravb);
    this.gravb.interactive = true;
    this.gravb.hitArea = new Pixi.Rectangle(0, 0, 17, 17);

    this.planb = new Pixi.Graphics();
    this.planb.lineStyle(2, 0xFFFFFF);
    this.planb.drawRect(0, 0, 17, 17);
    this.planb.position.set(525, 420)
    this.stage.addChild(this.planb);
    this.planb.interactive = true;
    this.planb.hitArea = new Pixi.Rectangle(0, 0, 17, 17);

    this.missb = new Pixi.Graphics();
    this.missb.lineStyle(2, 0xFFFFFF);
    this.missb.drawRect(0, 0, 17, 17);
    this.missb.position.set(525, 443);
    this.stage.addChild(this.missb);
    this.missb.interactive = true;
    this.missb.hitArea = new Pixi.Rectangle(0, 0, 17, 17);

    this.ailb = new Pixi.Graphics();
    this.ailb.lineStyle(2, 0xFFFFFF);
    this.ailb.drawRect(0, 0, 17, 17);
    this.ailb.position.set(525, 466);
    this.stage.addChild(this.ailb);
    this.ailb.interactive = true;
    this.ailb.hitArea = new Pixi.Rectangle(0, 0, 17, 17);

    this.airb = new Pixi.Graphics();
    this.airb.lineStyle(2, 0xFFFFFF);
    this.airb.drawRect(0, 0, 17, 17);
    this.airb.position.set(525, 489);
    this.stage.addChild(this.airb);
    this.airb.interactive = true;
    this.airb.hitArea = new Pixi.Rectangle(0, 0, 17, 17);

    this.sounds = new Pixi.Sprite(this.resources.check.texture);
    this.sounds.position.set(524, 372);
    this.stage.addChild(this.sounds);

    this.gravs = new Pixi.Sprite(this.resources.check.texture);
    this.gravs.position.set(524, 396);
    this.stage.addChild(this.gravs);

    this.plans = new Pixi.Sprite(this.resources.check.texture);
    this.plans.position.set(524, 420);
    this.stage.addChild(this.plans);

    this.misss = new Pixi.Sprite(this.resources.check.texture);
    this.misss.position.set(524, 444);
    this.stage.addChild(this.misss);

    this.ails = new Pixi.Sprite(this.resources.check.texture);
    this.ails.position.set(524, 466);
    this.stage.addChild(this.ails);

    this.airs = new Pixi.Sprite(this.resources.check.texture);
    this.airs.position.set(524, 489);
    this.stage.addChild(this.airs);

    this.settings = {
      sound: window.localStorage.getItem('sw_sound') === "false" ? false : true,
      gravity: window.localStorage.getItem('sw_gravity') === "true" ? true : false,
      planet: window.localStorage.getItem('sw_planet') === "false" ? false : true,
      mseek: window.localStorage.getItem('sw_mseek') === "false" ? false : true,
      aileft: window.localStorage.getItem('sw_aileft') === "true" ? true : false,
      airight: window.localStorage.getItem('sw_airight') === "false" ? false : true,
      pcolors: [0x55FFFF, 0xFF55FF],
      scolors: [0x55FFFF, 0xFF55FF]
    };

    this.sounds.renderable = this.settings.sound;
    this.plans.renderable = this.settings.planet;
    this.gravs.renderable = this.settings.gravity;
    this.misss.renderable = this.settings.mseek;
    this.ails.renderable = this.settings.aileft;
    this.airs.renderable = this.settings.airight;

    Howler.volume(this.settings.sound ? 1 : 0);

    this.soundb.on('mousedown', () => {

      this.settings.sound = !this.settings.sound;
      window.localStorage.setItem('sw_sound', this.settings.sound);
      this.sounds.renderable = this.settings.sound;
      Howler.volume(this.settings.sound ? 1 : 0);
    });

    this.gravb.on('mousedown', () => {

      this.settings.gravity = !this.settings.gravity;
      window.localStorage.setItem('sw_gravity', this.settings.gravity);
      this.gravs.renderable = this.settings.gravity;
    });


    this.planb.on('mousedown', () => {

      this.settings.planet = !this.settings.planet;
      window.localStorage.setItem('sw_planet', this.settings.planet);
      this.plans.renderable = this.settings.planet;
    });

    this.missb.on('mousedown', () => {

      this.settings.mseek = !this.settings.mseek;
      window.localStorage.setItem('sw_mseek', this.settings.mseek);
      this.misss.renderable = this.settings.mseek;
    });

    this.ailb.on('mousedown', () => {

      this.settings.aileft = !this.settings.aileft;
      window.localStorage.setItem('sw_aileft', this.settings.aileft);
      this.ails.renderable = this.settings.aileft;
    });

    this.airb.on('mousedown', () => {

      this.settings.airight = !this.settings.airight;
      window.localStorage.setItem('sw_airight', this.settings.airight);
      this.airs.renderable = this.settings.airight;
    });

    this.startb.on('mousedown', () => {

      this.main.startGame(this.settings);
    });

    const leftScoreC = new Pixi.Container();
    this.stage.addChild(leftScoreC);
    const leftchars = String(this.main.leftScore).split('');
    let width = 0;
    for (let letter of leftchars) {
      const sprite = new Pixi.Sprite.fromFrame(`aether-${letter}`);
      sprite.scale.set(2);
      sprite.position.set(width, 0);
      width += sprite.width;
      leftScoreC.addChild(sprite);
    }
    leftScoreC.position.set(131, 390);

    const rightScoreC = new Pixi.Container();
    this.stage.addChild(rightScoreC);
    const rightchars = String(this.main.rightScore).split('');
    width = 0;
    for (let letter of rightchars) {
      const sprite = new Pixi.Sprite.fromFrame(`aether-${letter}`);
      sprite.scale.set(2);
      sprite.position.set(width, 0);
      width += sprite.width;
      rightScoreC.addChild(sprite);
    }
    rightScoreC.position.set(330, 390);
     


    this.leftShip = new Pixi.Sprite(this.resources.ship1.texture);
    this.rightShip = new Pixi.Sprite(this.resources.ship2.texture);
    this.rightShip.scale.set(2);
    this.rightShip.anchor.set(.5);
    this.rightShip.tint = this.settings.scolors[1];
    //this.rightShip.rotation = -Math.PI / 2;
    this.leftShip.scale.set(2);
    this.leftShip.anchor.set(.5);
    this.leftShip.tint = this.settings.scolors[0];
    this.leftShip.position.set(100, 400);
    //this.leftShip.rotation = Math.PI / 2;
    this.rightShip.position.set(300, 400);
    this.stage.addChild(this.leftShip);
    this.stage.addChild(this.rightShip);

    const logoContainer = new Pixi.Container();
    this.stage.addChild(logoContainer);
    const logotext = ['s', 'p', 'a', 'c', 'e', 'w', 'a', 'r'];
    this.logosprites = [];
    let logowidth = 0;
    for (let letter of logotext) {
      const sprite = new Pixi.Sprite.fromFrame(`kosov-${letter}`);
      sprite.scale.set(4);
      sprite.position.set(logowidth, 30);
      logowidth += sprite.width;
      logoContainer.addChild(sprite);
      this.logosprites.push(sprite);
    }
    logoContainer.position.set(this.main.width / 2 - logowidth / 2, 100);

    const menu = this;
    let scale = { s: 1.5 };
    const bounce1 = new Tween.Tween(scale)
    .easing(Tween.Easing.Cubic.Out)
    .to({ s: 2 }, 1000)
    .onUpdate(function () {
      menu.leftShip.scale.set(scale.s);
      menu.rightShip.scale.set(scale.s);
    });
    const bounce2 = new Tween.Tween(scale)
    .easing(Tween.Easing.Cubic.In)
    .to({ s: 1.5 }, 1000)
    .onUpdate(function () {
      menu.leftShip.scale.set(scale.s);
      menu.rightShip.scale.set(scale.s);
    })
    .onComplete(function () {
    });
    bounce1.chain(bounce2);
    bounce2.chain(bounce1);

    this.r = 0;
    this.seg = Math.PI * 2 / 8;
  }

  down(event) {

    if (event.code === 'Enter' || event.code === 'Space') {
      this.main.startGame(this.settings);
    }
  }


  update(dt, du) {

    this.r = this.r + du * .1;
    this.r %= Math.PI * 2;
    let s = 0;
    for (let sprite of this.logosprites) {
      sprite.position.y = 30 + Math.cos(this.r + s) * 15;
      s += this.seg;
    }
  }

  destroy() {

    super.destroy();
  }

}

module.exports = Menu;
