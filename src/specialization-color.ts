import colors from "tailwindcss/colors";

export function getSpecializationColor(specialization: string) {
    switch (specialization) {
        case 'Stomatologia': {
            return colors.red['300'];
        }
        // case 'Implantologia': {
        //     return colors.green["300"];
        // }
        case 'Ortodoncja': {
            return colors.white;
        }
        // case 'Protetyka': {
        //     return colors.blue["300"];
        // }
        // case 'Periodontologia': {
        //     return colors.violet["300"];
        // }
        // case 'Rehabilitacja': {
        //     return colors.orange["300"];
        // }
        default:
            return colors.white;
    }
}
