/**
 * Extensions.js
 * 
 * (c) Renaud PINON 2024.
 * 
 * Tests unitaires du fichier extensions.js. 
 * 
 */

QUnit.module('Extensions', function() {

  QUnit.test('min()', assert => {
    var array1 = [32, 12, 3, 67, 89, 1, 23];
    assert.notEqual(array1.min(), null, "IsNull(array1.min()) should be false");
    assert.equal(array1.min(), 1, "array1.min() should be 1");

    var array2 = [{name: 'a', value: 21}, {name: 'b', value: 42}, {name: 'c', value: 11}, {name: 'd', value: 17}, {name: 'e', value: 4}, {name: 'f', value: 74}];
    assert.notEqual(array2.min(d => d.value), null, "IsNull(array2.min(d => d.value)) should be false");
    assert.equal(array2.min(d => d.value).name, 'e', "array2.min(d => d.value) should be the 4th object");
  });

  QUnit.test('max()', assert => {
    var array1 = [32, 12, 3, 67, 89, 1, 23];
    assert.notEqual(array1.max(), null, "IsNull(array1.max()) should be false");
    assert.equal(array1.max(), 89, "array1.max() should be 89");

    var array2 = [{name: 'a', value: 21}, {name: 'b', value: 42}, {name: 'c', value: 11}, {name: 'd', value: 17}, {name: 'e', value: 4}, {name: 'f', value: 74}];
    assert.notEqual(array2.max(d => d.value), null, "IsNull(array2.max(d => d.value)) should be false");
    assert.equal(array2.max(d => d.value).name, 'f', "array2.max(d => d.value) should be the 5th object");
  });

  QUnit.test('remove()', assert => {
    var obj1 = {name: "test", value: 45};
    var obj2 = {name: "test2", value: 76};
    var obj3 = {name: "test3", value: 12};

    var array1 = [obj1, obj2, obj3];

    assert.equal(array1.remove(obj2), obj2, "Remove should return the object before removing it");
    assert.equal(array1.length, 2, "An element should have been removed");
    assert.equal(array1.indexOf(obj2), -1, "obj2 shouldn't be in the array anymore");
  });

  QUnit.test('removeAt()', assert => {
    var array1 = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

    assert.equal(array1.removeAt(1), '2', "Remove should return the object before removing it");
    assert.equal(array1.length, 8, "An element should have been removed");

    var sliced = array1.removeAt(1, 3);
    assert.equal(array1.length, 5, "3 elements should have been removed (new length = 5)");
    assert.equal(sliced.length, 3, "The returned array should contain 3 elements");
    assert.equal(array1[1], '6', "The second element should be '6'");
    assert.equal(sliced[0], '3', "The first element of 'sliced' should be '3'");

    var sliced2 = array1.removeAt(3, 35);
    assert.equal(array1.length, 3, "All elements except the first 2 should have been removed");
    assert.equal(sliced2.length, 2, "3 elements should have been removed");

    assert.equal(array1[0], '1', "Array1 first element should be '1'");
    assert.equal(array1[1], '6', "Array1 second element should be '6'");
    assert.equal(array1[2], '7', "Array1 last element should be '7'");

    assert.equal(sliced2[0], '8', "Sliced2 first element should be '8'");
    assert.equal(sliced2[sliced2.length - 1], '9', "Sliced2 last element should be '9'");

  });

  QUnit.test('removeWhere()', assert => {
    var obj1 = {name: "test", value: 45};
    var obj2 = {name: "test2", value: 76};
    var obj3 = {name: "test3", value: 12};
    var obj4 = {name: "test4", value: 89};
    var obj5 = {name: "test6", value: 2};

    var array1 = [obj1, obj2, obj3, obj4, obj5];
    var arrayRemoved = array1.removeWhere(d => d.value > 70);

    assert.equal(array1.length, 3, "3 elements should be present");
    assert.equal(arrayRemoved.length, 2, "2 element should have been removed");
    assert.equal(array1.indexOf(obj2), -1, "obj2 shouldn't be in the array anymore");
    assert.equal(array1.indexOf(obj4), -1, "obj4 shouldn't be in the array anymore");
    assert.equal(arrayRemoved.indexOf(obj2) > -1, true, "obj2 should be in the array containing removed objects");
    assert.equal(arrayRemoved.indexOf(obj4) > -1, true, "obj4 should be in the array containing removed objects");

  });

  QUnit.test('Object.inheritsFrom()', assert => {
    class Test1 { constructor() { this.x = 1;}}
    class Test2 extends Test1 { constructor() { super(); this.y = 2; }}
    class Test3 extends Test2 { constructor() { super(); this.z = 3; }}

    var t1 = new Test1();
    var t2 = new Test2();
    var t3 = new Test3();

    assert.equal(t1.inheritsFrom('Test1'), true, "t1 should inherit from Test1");
    assert.equal(t1.inheritsFrom('Object'), true, "t1 should inherit from Object");
    assert.equal(t1.inheritsFrom('Test2'), false, "t1 shouldn't inherit from Test2");
    assert.equal(t1.inheritsFrom('Test3'), false, "t1 shouldn't inherit from Test3");

    assert.equal(t2.inheritsFrom('Test2'), true, "t2 should inherit from Test2");
    assert.equal(t2.inheritsFrom('Test1'), true, "t2 should inherit from Test1");
    assert.equal(t2.inheritsFrom('Object'), true, "t2 should inherit from Object");
    assert.equal(t2.inheritsFrom('Test3'), false, "t2 shouldn't inherit from Test3");

    assert.equal(t3.inheritsFrom('Test3'), true, "t3 should inherit from Test3");
    assert.equal(t3.inheritsFrom('Test2'), true, "t3 should inherit from Test2");
    assert.equal(t3.inheritsFrom('Test1'), true, "t3 should inherit from Test1");
    assert.equal(t3.inheritsFrom('Object'), true, "t3 should inherit from Object");

  });

  QUnit.test('strWithCharsRemovedAt()', assert => {
    var obj1 = 'ABCDEFGH';

    assert.equal(obj1.strWithCharsRemovedAt(3, 3), 'ABCGH', "ABCDEFGH minus DEF should be ABCGH");
    assert.equal(obj1.strWithCharsRemovedAt(0, 3), 'DEFGH', "ABCDEFGH minus ABC should be DEFGH");
    assert.equal(obj1.strWithCharsRemovedAt(5, 3), 'ABCDE', "ABCDEFGH minus FGH should be ABCDE");
    assert.equal(obj1.strWithCharsRemovedAt(2), 'ABDEFGH', "ABCDEFGH minus C should be ABDEFGH");

  });


});
