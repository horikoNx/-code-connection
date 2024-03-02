let 歩数全ブロック = 0
let 歩数エメラルドブロック = 0
let 歩数ラピスラズリブロック = 0
player.onChat("right", function () {
    agent.turn(RIGHT_TURN)
})
player.onChat("left", function () {
    agent.turn(LEFT_TURN)
})
player.onChat("variable repair", function () {
    歩数全ブロック = 0
    歩数エメラルドブロック = 0
    歩数ラピスラズリブロック = 0
    player.tell(mobs.target(LOCAL_PLAYER), "全ての変数を所定の値に戻しました。")
})
player.onChat("givedata emeraldblocks", function () {
    player.tell(mobs.target(LOCAL_PLAYER), "全ブロックの通った回数")
    player.tell(mobs.target(LOCAL_PLAYER), 歩数全ブロック + 20)
    player.tell(mobs.target(LOCAL_PLAYER), "Debug：エメラルドブロックの通った回数")
    player.tell(mobs.target(LOCAL_PLAYER), 歩数エメラルドブロック)
    player.tell(mobs.target(LOCAL_PLAYER), "Debug：ラピスラズリブロックの通った回数")
    player.tell(mobs.target(LOCAL_PLAYER), 歩数ラピスラズリブロック)
})
player.onChat("go", function () {
    歩数全ブロック = 0
    歩数ラピスラズリブロック = 0
    歩数エメラルドブロック = 0
    agent.teleport(world(-14, -60, 49), EAST)
    loops.pause(1000)
    agent.move(FORWARD, 1)
    while (agent.inspect(AgentInspection.Block, DOWN) != GOLD_BLOCK) {
        if (agent.inspect(AgentInspection.Block, LEFT) == ACACIA_FENCE && (agent.inspect(AgentInspection.Block, FORWARD) == AIR && (agent.inspect(AgentInspection.Block, RIGHT) == AIR && agent.inspect(AgentInspection.Block, BACK) == AIR))) {
            agent.turn(RIGHT_TURN)
            for (let index = 0; index < 2; index++) {
                agent.move(FORWARD, 1)
            }
        } else if (agent.inspect(AgentInspection.Block, DOWN) == GRASS) {
            歩数全ブロック += 1
            agent.move(FORWARD, 1)
            loops.pause(210)
        }
        if (agent.inspect(AgentInspection.Block, DOWN) == LAPIS_LAZULI_BLOCK) {
            歩数全ブロック += 1
            歩数ラピスラズリブロック += 1
            agent.turn(LEFT_TURN)
            for (let index = 0; index < 2; index++) {
                agent.move(FORWARD, 1)
                loops.pause(100)
            }
        }
        if (agent.inspect(AgentInspection.Block, DOWN) == EMERALD_BLOCK) {
            歩数全ブロック += 1
            歩数エメラルドブロック += 1
            agent.turn(RIGHT_TURN)
            for (let index = 0; index < 2; index++) {
                agent.move(FORWARD, 1)
                loops.pause(100)
            }
        }
        if (agent.inspect(AgentInspection.Block, FORWARD) == ACACIA_FENCE && agent.inspect(AgentInspection.Block, LEFT) == AIR) {
            agent.turn(RIGHT_TURN)
            for (let index = 0; index < 2; index++) {
                agent.move(FORWARD, 1)
                loops.pause(100)
            }
        }
    }
    if (agent.inspect(AgentInspection.Block, DOWN) == GOLD_BLOCK) {
        player.runChatCommand("givedata emeraldblocks")
    }
})
player.onChat("here", function () {
    agent.teleportToPlayer()
})
