
class NormalHitEffect extends ProjectileEffect {
    apply(target, dmg) {
        target.takeDamage(dmg);
    }
}
