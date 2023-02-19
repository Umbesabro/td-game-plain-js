const ENEMY_CFG = {
    [ENEMY_TYPE.soldiers]: {
        type: ENEMY_TYPE.soldiers,
        hp: 15,
        speed: 1,
        goldGain: 2,
        walkAnimation: {
            imgSrc: "assets/orc_soldier_walk_sprite.png",
            frozenImgSrc: "assets/frozen_orc_soldier_walk_sprite.png",
            maxFrames: 7,
            hold: 3
        },
        dieAnimation: {
            imgSrc: "assets/orc_soldier_die_sprite.png",
            maxFrames: 10,
            hold: 3
        }
    },
    [ENEMY_TYPE.sprinters]: {
        type: ENEMY_TYPE.sprinters,
        hp: 15,
        speed: 1.75,
        goldGain: 4,
        walkAnimation: {
            imgSrc: "assets/orc_sprinter_run_sprite.png",
            maxFrames: 7,
            hold: 3
        },
        dieAnimation: {
            imgSrc: "assets/orc_sprinter_die_sprite.png",
            maxFrames: 10,
            hold: 3
        }
    },
    [ENEMY_TYPE.bosses]: {
        type: ENEMY_TYPE.bosses,
        hp: 100,
        speed: 1.1,
        goldGain: 4,
        walkAnimation: {
            imgSrc: "assets/orc_boss_walk_sprite.png",
            maxFrames: 7,
            hold: 3
        },
        dieAnimation: {
            imgSrc: "assets/orc_boss_die_sprite.png",
            maxFrames:10,
            hold: 3
        }
    }
}
