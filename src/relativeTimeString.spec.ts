import { getRelativeTimeString } from './relativeTimeString';
import { DateTime, Duration } from 'luxon';

export function $localize(_messageParts: TemplateStringsArray, ..._expressions: readonly any[]): string {
    return " test ";
}

describe("RelativeTimeString", () => {
    it("getRelativeTimeString returns something", () => {
        var today = DateTime.now();
        var result = getRelativeTimeString(today, true, 1);
        expect(result.length).toBeGreaterThan(1);
    });

    it("future and past return different strings", () => {
        var week = Duration.fromObject({ weeks: 2 })
        var future = DateTime.now().plus(week);
        var past = DateTime.now().minus(week);

        var res_future = getRelativeTimeString(future, true, 1);
        var res_past = getRelativeTimeString(past, true, 1);

        expect(res_future != res_past).toBeTrue();
    });

    it("parts parameter works", () => {
        var delta = Duration.fromObject({ day: 2, hour: 2, minute: 5 });
        var time = DateTime.now().plus(delta);

        var p1 = getRelativeTimeString(time, true, 1);
        var p2 = getRelativeTimeString(time, true, 2);
        var p3 = getRelativeTimeString(time, true, 3);

        expect(p1.length).toBeLessThan(p2.length);
        expect(p1.length).toBeLessThan(p3.length);
        expect(p2.length).toBeLessThan(p3.length);
    });
});
