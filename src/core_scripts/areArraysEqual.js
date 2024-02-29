const areArraysEqual = (
    array_1,
    array_2,
) => {
    if (array_1.length === array_2.length) {
        let areEqual = true;

        for (let i = 0; i < array_1.length; i++) {
            if (array_1[i] !== array_2[i]) {
                areEqual = false;

                break;
            }
        }

        if (areEqual === false) {
            return false;
        } else {
            return true;
        }
    } else {
        return false;
    }
}

export default areArraysEqual;
