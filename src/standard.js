/**
 * (c) Renaud PINON 2024.
 * 
 * Utilisation possible sans autorisation et sans restriction à condition de laisser les mentions d'appartenance (copyright) en début de fichier.
 * 
 * Ensemble de fonctions utilitaires.
 * 
 * */

function CallAsync(func, onsuccess, params)
{
  //optionalDelay = (IsNull(optionalDelay) == true) ? 0 : optionalDelay;
  var args = [];
  for (var i = 2 ; i < arguments.length ; i++)
    {
      args.push(arguments[i]);
    }

  setTimeout(function(func, onsuccess, args){
    var ret = func(...args);

    if (IsNotNull(onsuccess) == true)
      {
        onsuccess({ state: 'success', result: ret });
      }
  }, 0, func, onsuccess, args);
}

function CallAsyncClear(asyncObject)
{
  if (IsNotNull(asyncObject) == true)
    {
      clearTimeout(asyncObject);
    }
}

// Public Domain/MIT
/**
* Source: https://stackoverflow.com/a/8809472
*/
function CreateUUID() {
    var d = new Date().getTime();//Timestamp
    var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16;//random number between 0 and 16
        if(d > 0){//Use timestamp until depleted
            r = (d + r)%16 | 0;
            d = Math.floor(d/16);
        } else {//Use microseconds since page-load if supported
            r = (d2 + r)%16 | 0;
            d2 = Math.floor(d2/16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

/**
* Returns the list of ancestor classes.
*
* Example:
*   ancestors(HTMLElement) .map (e => e.name || e.constructor.name)
*   => [ "HTMLElement", "Element", "Node", "EventTarget", "Function", "Object" ]
*
* Modifié pour prendre en compte un objet et non un nom
* @source: https://gist.github.com/ceving/2fa45caa47858ff7c639147542d71f9f
*/
/*function getBaseClassNames (strClass)
{
  switch (true) {
  case (strClass === undefined): return;
  case (strClass === null): return [];
  default:
    return [strClass, ...(ancestors (Object.getPrototypeOf (strClass)))];
  }
}

function getBaseClassName(obj)
{
  var ret = '';
  if (IsNotEmpty(strClass) == true)
  {

    ret = [strClass, ...(ancestors (Object.getPrototypeOf (strClass)))];
  }

  return ret;
}

function getBaseClasses(obj)
{
  var ret = '';
  if (IsNotEmpty(strClass) == true)
  {

    ret = [strClass, ...(ancestors (Object.getPrototypeOf (strClass)))];
  }

  return ret;
}*/

function getClassName(obj)
{
  return (typeof(obj) !== 'object' || IsNull(obj) == true) ? 'unknown' : obj.constructor.name;
}

function getEnumTypeFromValue(enumObject, value)
{
  var ret = '';

  if (IsNotNull(enumObject) == true && typeof enumObject == 'object')
  {
    for (var prop in enumObject)
    {
      if (enumObject[prop] == value)
      {
        ret = prop;
        break;
      }
    }
  }

  return ret;
}

function IsCommandKeyPressed(evt)
{
  var isMac = navigator.platform.toUpperCase().indexOf('MAC')>=0;

  return (isMac == true ? evt.metaKey : evt.ctrlKey);
}

function isObjectOfClass(obj, className)
{
  return (getClassName(obj) == className);
}

function IsEmpty(variable)
{
  return IsNull(variable) == true || variable == '';
}

function IsFunction(functionToCheck)
{
 return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}

function IsNotFunction(functionToCheck)
{
  return (IsFunction(functionToCheck) == false);
}

function IsNotEmpty(variable)
{
  return IsEmpty(variable) == false;
}

function IsNull(variable)
{
  return IsNotNull(variable) == false;
}

function IsNotNull(variable)
{
  return variable != null && variable != undefined;
}

function DegreestoRadians (angle)
{
  return angle * (Math.PI / 180);
}

function RadianstoDegrees (angle)
{
  return angle / (Math.PI / 180);
  //return angle * (180 / Math.PI);
}

function StringReplaceAccents(str)
{
  var ret = IsNull(str) == true ? "" : ("" + str);

  var arReplace = {
    e: ['é', 'è', 'ê', 'ë'],
    a: ['à', 'â', 'ä'],
    o: ['ô', 'ö'],
    u: ['û', 'ù', 'ü'],
    i: ['î', 'ï'],
    c: ['ç'],
  };

  for (var key in arReplace)
    {
      for (var i in arReplace[key])
        {
          ret = ret.replaceAll(arReplace[key][i], key);
        }
    }

  return ret;
}

function StringRemovePonctuations(str)
{
  var ret = IsNull(str) == true ? '' : ('' + str);

  var arReplace = ['.', ';', ',', ':', '?', '!', '/', '=', '+', '*', "'", '-', '_'];

  for (var i in arReplace)
    {
      ret = ret.replaceAll(arReplace[i], '');
    }


  return ret;
}

var _arThrottle = [];
function Throttle(interval, alias, func, args)
{
  //console.log('throttle');
  var existing = _arThrottle.firstOrDefault(d => d.alias == alias);
  if (IsNotNull(existing) == true)
  {
    existing.next = {interval: interval, alias: alias, timeoutObject: null, func: func, args: args};
  }
  else
  {
    var timeoutObject = setTimeout(function(){
      //console.log('timeout !');

      existing = _arThrottle.firstOrDefault(d => d.alias == alias);

      if (IsNotNull(existing) == true)
      {
        clearTimeout(existing.timeoutObject);
        _arThrottle.removeWhere(d => d.alias == alias);

        // Exécution de la fonction:
        if (IsNotNull(existing.func) == true)
        {
          existing.func(...existing.args);
        }

        // Lancement du prochain mis en mémoire si nécessaire:
        if (IsNotNull(existing.next) == true)
        {
          Throttle(existing.interval, existing.alias, existing.next.func, existing.next.args);
        }
      }
    }, interval, alias);

    // Insertion de l'objet descriptif dans le tableau:
    _arThrottle.push({ interval: interval, alias: alias, timeoutObject: timeoutObject, func: func, args: args, next: null });
  }
}

function UnpackObjectPropertiesAsArrays(obj, strProperties)
{
  // Question : ne serait-il pas plus pertinent d'utiliser une bibliothèque JSONPath ?
  // Pour le moment on reste comme ça...
  var ret = obj;

  var properties = strProperties.split('.');
  for (var i in properties)
  {
    // TODO: cas tableaux ?
    if (IsNotEmpty(properties[i]) == true)
    {
      ret = ret[properties[i]];
    }
  }

  return ret;
}

function UpperFirstLetter(str)
{
  var ret = IsEmpty(str) == true ? '' : str;

  if (ret.length > 0)
    {
      ret =  ('' + ret[0]).toUpperCase() + ret.substring(1, ret.length);
    }

  return ret;
}
