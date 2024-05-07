import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const isEmpty = (obj) =>
  [Object, Array].includes((obj || {}).constructor) && !Object.entries(obj || {}).length;
export const nearest = function (dates, target) {
  if (!target) target = Date.now();
  else if (target instanceof Date) target = target.getTime();

  let nearest = Infinity;
  let winner = -1;
  dates.forEach(function (date, index) {
    if (date instanceof Date) date = date.getTime();
    let distance = Math.abs(date - target);
    if (distance < nearest) {
      nearest = distance;
      winner = index;
    }
  });
  return winner;
};
export const GetClientIp = createParamDecorator((_, ctx: ExecutionContext) => {
  let request = ctx.switchToHttp().getRequest();
  let headers = request.headers;
  let ipaddress: string = "";
  if (headers["x-forwarded-for"]) {
    ipaddress = headers["x-forwarded-for"];
  } else if ("x-real-ip") {
    ipaddress = headers["x-real-ip"];
  } else {
    ipaddress = request.connection?.remoteAddress ?? request.ip;
  }
  if (
    ipaddress == null ||
    ipaddress == undefined ||
    ipaddress == "" ||
    ipaddress.includes("::ffff:")
  ) {
    ipaddress = "127.0.0.1";
  }
  return ipaddress;
});
