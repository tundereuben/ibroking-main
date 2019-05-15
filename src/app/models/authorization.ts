import { HttpHeaders } from '@angular/common/http';

export const DEFAULT_HEADERS = new HttpHeaders({
  'Content-Type': 'application/json',
  'Accept': 'application/json;charset=UTF-8',
  'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  'Access-Control-Allow-Origin': '*'
});