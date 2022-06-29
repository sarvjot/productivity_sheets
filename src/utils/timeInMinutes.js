export default function timeInMinutes(t1, t2) {
    return (t2.hour - t1.hour) * 60 + (t2.minute - t1.minute)
}
