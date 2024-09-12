input.onGesture(Gesture.EightG, function () {
    if (id >= 0) {
        hasFallen = true
        radio.sendString("hasFallen")
    }
})
input.onButtonPressed(Button.A, function () {
    id += -1
})
input.onButtonPressed(Button.AB, function () {
    if (isActive == false) {
        setId(id)
    } else {
        if (id < 0) {
            if (someoneFallen == true) {
                someoneFallen = false
            }
        }
    }
})
radio.onReceivedString(function (receivedString) {
    if (receivedString == "id_exists") {
        if (id >= 0) {
            setId(id + 1)
        } else {
            setId(id - 1)
        }
    } else if (receivedString == "id_found") {
        basic.clearScreen()
        isActive = true
        if (id >= 0) {
            hasFallen = false
        } else {
            someoneFallen = false
        }
    }
    if (id < 0) {
        if (receivedString == "helpLocation") {
            beepTempo = radio.receivedPacket(RadioPacketProperty.Time)
        } else if (receivedString == "hasFallen") {
            someoneFallen = true
        }
    }
})
input.onButtonPressed(Button.B, function () {
    id += 1
})
radio.onReceivedValue(function (name, value) {
    if (name == "id") {
        if (value == id) {
            radio.sendString("id_exists")
        } else {
            radio.sendString("id_found")
        }
    }
})
function setId (num: number) {
    id = num
    radio.sendValue("id", id)
}
let beepTempo = 0
let someoneFallen = false
let hasFallen = false
let id = 0
let isActive = false
isActive = false
radio.setGroup(57)
id = 0
basic.forever(function () {
    if (isActive == true) {
        basic.showString("M" + id)
    }
})
basic.forever(function () {
    if (isActive == true) {
        if (id >= 0) {
            while (hasFallen == true) {
                radio.sendString("helpLocation")
            }
        } else {
            while (someoneFallen == true) {
                music.play(music.stringPlayable("C5 - - - - - - - ", 1000), music.PlaybackMode.UntilDone)
            }
        }
    } else {
        basic.showNumber(id)
    }
})
