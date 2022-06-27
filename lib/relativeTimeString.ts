import { DateTime } from 'luxon';

declare function $localize(messageParts: TemplateStringsArray, ...expressions: readonly any[]): string;

/**
 * Convert a Luxon DateTime into a relative time string (e.g. '5 seconds ago').
 * @param time The DateTime object to convert.
 * @param capitalize Whether or not to capitalize the returned string.
 * @param accuracy The maximum desired accuracy of the returned string (in string parts).
 * @returns A localized relative time string
 */
export function getRelativeTimeString(time: DateTime, capitalize=true, accuracy=2): string {
    const duration = time.diffNow(['weeks', 'days', 'hours', 'minutes', 'seconds']);
    const parseNumber = (x: number) => Math.abs(Math.floor(x));

    if (duration.weeks > 1) {
        return $localize`:@@duration.xWeeksAgo:${parseNumber(duration.weeks)} weken geleden`;
    } else if (duration.weeks < -1) {
        return $localize`:@@duration.inxWeeks:binnen ${parseNumber(duration.weeks)} weken`;
    } else if (Math.abs(duration.weeks) > 0) {
        return $localize`:@@duration.oneWeekAgo:een week geleden`;
    }

    let parts = [] as string[];

    if (Math.abs(duration.days) >= 2.0) {
        parts.push($localize`:@@duration.xDays:${parseNumber(duration.days)} dagen`);
    } else if (Math.abs(duration.days) >= 1.0) {
        parts.push($localize`:@@duration.oneDay:een dag`);
    }

    if (parts.length < accuracy) {
        if (Math.abs(duration.hours) >= 2.0) {
            parts.push($localize`:@@duration.xHours:${parseNumber(duration.hours)} uren`);
        } else if (Math.abs(duration.hours) >= 1.0) {
            parts.push($localize`:@@duration.oneHour:een uur`);
        }
    }

    if (parts.length < accuracy) {
        if (Math.abs(duration.minutes) >= 2.0) {
            parts.push($localize`:@@duration.xMinutes:${parseNumber(duration.minutes)} minuten`);
        } else if (Math.abs(duration.minutes) >= 1.0) {
            parts.push($localize`:@@duration.oneMinute:een minuut`);
        }
    }

    if (parts.length < accuracy) {
        if (Math.abs(duration.seconds) >= 2.0) {
            parts.push($localize`:@@duration.xSeconds:${parseNumber(duration.seconds)} seconden`);
        } else if (Math.abs(duration.seconds) >= 1.0) {
            parts.push($localize`:@@duration.oneSecond:een seconde`);
        }
    }

    let timeString = '';
    if (parts.length > 1) {
        const firstPart = parts.slice(0, -1).join(', ');
        const lastPart = parts[parts.length-1];
        if (duration.as('seconds') < 0) {
            timeString = $localize`:@@duration.multiplePartsAgo:${firstPart} en ${lastPart} geleden`;
        } else {
            timeString = $localize`:@@duration.inMultipleParts:binnen ${firstPart} en ${lastPart}`;
        }
    } else if (parts.length === 1) {
        const part = parts[0];
        if (duration.as('seconds') < 0) {
            timeString = $localize`:@@duration.onePartAgo:${part} geleden`;
        } else {
            timeString = $localize`:@@duration.inOnePart:binnen ${part}`;
        }
    } else if (duration.seconds > 0) {
        timeString = $localize`:@@duration.inAFewSeconds:binnen enkele seconden`;
    } else if (duration.seconds < 0) {
        timeString = $localize`:@@duration.aFewSecondsAgo:enkele seconden geleden`;
    } else {
        timeString = $localize`:@@duration.now:nu`;
    }
    if (capitalize) {
        timeString = `${timeString.charAt(0).toUpperCase()}${timeString.substring(1)}`;
    }
    return timeString;
}
