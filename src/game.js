const Scene = require('./scene');
const Pixi = require('pixi.js');
const Player = require('./player');
const Ship = require('./ship');
const Starfield = require('./starfield');
const Gravity = require('./gravity');
const Speedcap = require('./speedcap');
const Matter = require('matter-js');
const Moon = require('./moon');

class Game extends Scene {

  constructor(main, settings) {

    super(main);
    this.settings = settings;
    this.engine = Matter.Engine.create();
    this.engine.world.gravity.y = 0;
    this.particles = [];
    Matter.Events.on(this.engine, 'collisionStart', (e) => {

      for (let col of e.pairs) {
        col.bodyA.thing.collide(col.bodyB.thing);
        col.bodyB.thing.collide(col.bodyA.thing);
      }
    });
  }

  start() {

    this.starField = new Starfield(this);

    const kosove = new Pixi.Texture(this.resources.kosov.texture.baseTexture);
    kosove.frame = new Pixi.Rectangle(60,0,15,14);
    Pixi.Texture.addToCache(kosove, `kosov-e`);
    const kosovs = new Pixi.Texture(this.resources.kosov.texture.baseTexture);
    kosovs.frame = new Pixi.Rectangle(46,46,15,14);
    Pixi.Texture.addToCache(kosovs, `kosov-s`);

    this.ship = new Ship(this, 'ship1', 100, this.height / 2, true);
    this.player = new Player(this, this.ship,
      {
        w: 'thrust',
        a: 'left',
        d: 'right',
        s: 'missile',
        q: 'addshield',
        e: 'addenergy',
        c: 'laser',
      });
    this.ship2 = new Ship(this, 'ship2', this.width - 100, this.height / 2);
    this.player2 = new Player(this, this.ship2,
      {
        i: 'thrust',
        j: 'left',
        l: 'right',
        k: 'missile',
        u: 'addshield',
        o: 'addenergy',
        m: 'laser',
        Numpad7: 'addshield',
        Numpad8: 'thrust',
        Numpad9: 'addenergy',
        Numpad4: 'left',
        Numpad5: 'missile',
        Numpad6: 'right',
        Numpad1: 'laser'
      });


    this.ship.other = this.ship2;
    this.ship2.other = this.ship;
    const hw = this.width / 2;
    const hh = this.height / 2;

    if (this.settings.gravity) {
      this.gravity = new Gravity(this);
    }
    if (this.settings.planet) {
      this.moon = new Moon(this);
    }
    this.speedcap = new Speedcap(this, 10, 14);
  }

  end() {
    setTimeout(() => {
      this.main.startMenu();
    }, 4000);
  }

  update(dt, du) {

    this.player.update(dt, du);
    this.player2.update(dt, du);
    this.ship.update(dt, du);
    this.ship2.update(dt, du);
    for (let i = this.particles.length - 1; i >= 0; --i) {
      this.particles[i].update(dt, du);
    }
    if (this.settings.gravity) {
      this.gravity.update(dt, du);
    }
    this.speedcap.update(dt, du);
    

    Matter.Engine.update(
      this.engine,
      //this.app.ticker.elapsedMS
      dt
    );
  }

  destroy() {

    this.player.destruct();
    this.player2.destruct();
    for (let particle of this.particles) {
      particle.destroy();
    }
    this.ship.destruct(false);
    this.ship2.destruct(false);
    if (this.settings.gravity) {
      this.gravity.destruct();
    }
    if (this.settings.planet) {
      this.moon.destruct();
    }
    this.speedcap.destruct();

    delete this.starfield;
    super.destroy();
    Matter.Engine.clear(this.engine);
    delete this.player;
    delete this.player2;
    delete this.ship;
    delete this.ship2;
    delete this.gravity;
  }

}

module.exports = Game;
