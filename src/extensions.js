/**
 * Extensions.js
 * 
 * (c) Renaud PINON 2024.
 * 
 * Utilisation possible sans autorisation et sans restriction à condition de laisser les mentions d'appartenance (copyright) en début de fichier.
 * 
 * Ce fichier permet d'étendre les objets standard de Javascript (Array, String, etc...) afin de leur
 * ajouter des fonctions utilitaires.
 * 
 * Array => fonctions type Linq (firstOrDefault(), lastOrDefault(), min(), max(), where(), insertAt(), removeWhere(), etc...).
 * 
 * Object => getClassName(), isInstanceOf(), inheritsFrom(), etc...
 * 
 * String => contains(), replaceAt(), etc...
 * 
 */

if (!Array.clear)
{
  Object.defineProperty(Array.prototype, 'clear', {
      value: function() {
				this.splice(0, this.length);
      }
  });
}

if (!Array.contains)
{
  Object.defineProperty(Array.prototype, 'contains', {
      value: function(value) {
				return this.indexOf(value) > -1;
      }
  });
}

if (!Array.createCopy)
{
  Object.defineProperty(Array.prototype, 'createCopy', {
      value: function() {
				var ret = [];

				for (i = 0; i < this.length; i++)
				{
				  ret[i] = this[i];
				}

				return ret;
      }
  });
}

if (!Array.empty)
{
  Object.defineProperty(Array.prototype, 'empty', {
      value: function() {
				this.clear();		// C'est la même fonction, empty() et clear() vident le tableau.
      }
  });
}

if (!Array.firstOrDefault)
{
	Object.defineProperty(Array.prototype, 'firstOrDefault', {
		value: function(predicate)
		{
			var ret = null;

			if (predicate != null && predicate != undefined)
			{
				for (var i in this)
				{
					if (predicate(this[i]) == true)
					{
						ret = this[i];
						break;
					}
				}
			}

			return ret;
		}
	});
}

if (!Array.insertAt)
{
  Object.defineProperty(Array.prototype, 'insertAt', {
      value: function(index, elements) {
				var valuesToAdd = [];
        var i = 0;
				for (i = 1 ; i < arguments.length ; i++)
				{
					valuesToAdd.push(arguments[i]);
				}

				for (i = 0 ; i < valuesToAdd.length ; i++)
				{
					this.splice(index + i, 0, valuesToAdd[i]);
				}
      }
  });
}

if (!Array.lastOrDefault)
{
  Object.defineProperty(Array.prototype, 'lastOrDefault', {
      value: function(predicate) {
        var ret = null;
        for (var i = this.length - 1 ; i >= 0 ; i--)
        {
          if (predicate(this[i]) == true)
          {
            ret = this[i];
						break;
          }
        }
        return ret;
      }
  });
}

if (!Array.max)
{
  Object.defineProperty(Array.prototype, 'max', {
      value: function(predicate) {
        var ret = null;
				var lastValue = null;

        for (var i = 0  ; i < this.length ; i++)
        {
					var value = IsNull(predicate) == true ? this[i] : predicate(this[i]);
					if (IsNotNull(value) && (typeof(value) + '').toLowerCase() == 'number' && (IsNull(lastValue) == true || lastValue < value))
					{
						ret = this[i];
						lastValue = value;
					}
        }
        return ret;
      }
  });
}

if (!Array.min)
{
  Object.defineProperty(Array.prototype, 'min', {
      value: function(predicate) {
        var ret = null;
				var lastValue = null;

        for (var i = 0  ; i < this.length ; i++)
        {
					var value = IsNull(predicate) == true ? this[i] : predicate(this[i]);
					if (IsNotNull(value) && (typeof(value) + '').toLowerCase() == 'number' && (IsNull(lastValue) == true || lastValue > value))
					{
						ret = this[i];
						lastValue = value;
					}
        }
        return ret;
      }
  });
}

if (!Array.remove)
{
  Object.defineProperty(Array.prototype, 'remove', {
      value: function(object) {
				var ret = null;

        // suppression de l'objet si trouvé et retour:
        var index = this.indexOf(object);
        if (index > -1)
        {
          ret = this[index];
          this.splice(index, 1);
        }

        return ret;
      }
  });
}

if (!Array.removeWhere)
{
  Object.defineProperty(Array.prototype, 'removeWhere', {
      value: function(predicate) {
				var ret = [];

        if (IsFunction(predicate) == true)
        {
          // suppression de tous les objets validant le prédicate:
          for (var i = this.length - 1 ; i >= 0 ; i--)
          {
            if (predicate(this[i]) == true)
            {
              ret.push(this[i]);
              this.splice(i, 1);
            }
          }
        }

        return ret;
      }
  });
}

if (!Array.removeAt)
{
  Object.defineProperty(Array.prototype, 'removeAt', {
      value: function(index, length) {
				var ret = null;

        length = IsNull(length) == true ? 1 : length;

				if (this.length > index)
				{
					//ret = this[index];
					var spliced = this.splice(index, this.length > index + length ? length : (this.length - index));
          if (spliced.length == 1)
          {
            ret = spliced[0];
          }
          else
          {
            ret = spliced;
          }
				}

        return ret;
      }
  });
}

if (!Array.shuffle)
  {
    Object.defineProperty(Array.prototype, 'shuffle', {
      value: function() {
        for (var i = this.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [this[i], this[j]] = [this[j], this[i]];
        }
      }
    });
  }

if (!Array.where)
{
  Object.defineProperty(Array.prototype, 'where', {
      value: function(predicate) {
        var ret = [];
        for (var i in this)
        {
            if (predicate(this[i]) == true)
            {
              ret.push(this[i]);
            }
        }

        return ret;
      }
  });
}


// -------------- 'Object' object -------------------- //

if (!Object.getClassName)
{
  Object.defineProperty(Object.prototype, 'getClassName', {
      value: function() {
        return (this.constructor.name);
      }
  });
}

if (!Object.isInstanceOf)
{
  Object.defineProperty(Object.prototype, 'isInstanceOf', {
      value: function(className) {
        return (this.constructor.name == className);
      }
  });
}

if (!Object.inheritsFrom)
{
  Object.defineProperty(Object.prototype, 'inheritsFrom', {
      value: function(baseClassName) {
        var ret = false;
        var currentPrototype = Object.getPrototypeOf(this);

        if (IsNotNull(currentPrototype) == true)
        {
          ret = (currentPrototype.isInstanceOf(baseClassName)  == true);
          if (ret == false)
          {
            ret = currentPrototype.inheritsFrom(baseClassName);
          }
        }

        return ret;
      }
  });
}


if (!Object.getClassName)
{
  Object.defineProperty(Object.prototype, 'getClassName', {
      value: function(classDefinition) {
        return (typeof(obj) !== 'object' || IsNull(obj) == true) ? 'unknown' : obj.constructor.name;
      }
  });
}

// -------------- String object -------------------- //

if (!String.contains)
{
  Object.defineProperty(String.prototype, 'contains', {
    value: function(strValue) {
      return (this.indexOf(strValue) > -1);
    }
  });
}

if (!String.replaceAt)
{
  Object.defineProperty(String.prototype, 'replaceAt', {
    value: function(index, replacement) {
      return this.substring(0, index) + replacement + this.substring(index + replacement.length);
    }
  });
}

if (!String.strWithCharsRemovedAt)
{
  Object.defineProperty(String.prototype, 'strWithCharsRemovedAt', {
    value: function(index, optionalLength) {
      optionalLength = IsNull(optionalLength) == true ? 1 : optionalLength;
      var part1 = this.substring(0, index);
      var part2 = this.length - 1 < index + optionalLength ? '' : this.substring(index + optionalLength, this.length);
      return part1 + part2;
    }
  });
}
