import { Injectable } from "@angular/core";
import { STORAGE_KEYS } from "src/config/storage_keys.config";
import { LocalUser } from "src/app/models/local_user";
import { Card } from "../models/card";

@Injectable()
export class StorageService {
  
getLocalUser(): LocalUser {
  let usr = localStorage.getItem(STORAGE_KEYS.localUser);
  if (usr == null) {
    return null;
  }
  else {
    return JSON.parse(usr);
  }
}

setLocalUser(obj: LocalUser) {
  if (obj == null) {
    localStorage.removeItem(STORAGE_KEYS.localUser);
  }
  else {
    localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(obj));
  }
}

getCard (): Card {
  let storageCard = localStorage.getItem(STORAGE_KEYS.card);
  if (storageCard != null) {
    return JSON.parse(storageCard);
  }
  else
  {
    return null;
  }
}

setCard(obj: Card) {
  if (obj != null)
  {
    localStorage.setItem(STORAGE_KEYS.card, JSON.stringify(obj));
  }
  else 
  {
    localStorage.removeItem(STORAGE_KEYS.card);
  }
}

}
