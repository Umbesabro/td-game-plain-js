
const towersCfg = {
    "Archer": {
        name: "Archer",
        dmg: 2,
        cost: 20,
        color: "red",
        framesPerFire: 35,
        assets: {
            tower: {
                '1lvl': 'assets/towers/archer/1lvl.png'
            },
            board: {
                '1lvl': 'assets/towers/archer/tower_ui_board.png',
                'selected_1lvl': 'assets/towers/archer/selected_tower_ui_board.png'
            }
        }
    },
    "Rocket": {
        name: "Rocket",
        dmg: 1,
        cost: 50,
        color: "grey",
        framesPerFire: 50,
        range: 75,
        assets: {
            tower: {
                '1lvl': 'assets/towers/rocket/1lvl.png'
            },
            board: {
                '1lvl': 'assets/towers/rocket/tower_ui_board.png',
                'selected_1lvl': 'assets/towers/rocket/selected_tower_ui_board.png'
            }
        }
    },
    "Frost": {
        name: "Frost",
        cost: 35,
        color: "blue",
        framesPerFire: 150,
        range: 75,
        slowRate: 0.6,
        duration: 60 * 1.5,
        assets: {
            tower: {
                '1lvl': 'assets/towers/frost/1lvl.png'
            },
            board: {
                '1lvl': 'assets/towers/frost/tower_ui_board.png',
                'selected_1lvl': 'assets/towers/frost/selected_tower_ui_board.png'
            }
        }
    }
}
