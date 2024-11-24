/**
 * Standard.js
 * 
 * (c) Renaud PINON 2024.
 * 
 * Tests unitaires du fichier standard.js. 
 * 
 */

QUnit.module('Standard', function() {

  QUnit.test('IsNotNull()', assert => {
    assert.equal(IsNotNull(null), false, "IsNotNull(null) should be false");
    assert.equal(IsNotNull(undefined), false, "IsNotNull(undefined) should be false");
    assert.equal(IsNotNull(), false, "IsNotNull() should be false");
    assert.equal(IsNotNull(false), true, "IsNotNull(false) should be true");
    assert.equal(IsNotNull('x'), true, "IsNotNull('x') should be true");
    assert.equal(IsNotNull(4), true, "IsNotNull(4) should be true");
  });

  QUnit.test('IsNull()', assert => {
    assert.equal(IsNull(null), true, "IsNull(null) should be true");
    assert.equal(IsNull(undefined), true, "IsNull(undefined) should be true");
    assert.equal(IsNull(), true, "IsNull() should be true");
    assert.equal(IsNull(false), false, "IsNull(false) should be false");
    assert.equal(IsNull('x'), false, "IsNull('x') should be false");
    assert.equal(IsNull(4), false, "IsNull(4) should be false");
  });

  QUnit.test('UpperFirstLetter()', assert => {
    assert.equal(UpperFirstLetter('test'), 'Test', "Basic testing");
    assert.equal(UpperFirstLetter('Test'), 'Test', "Test if an uppercase beginning string is still OK");
    assert.equal(UpperFirstLetter('é-test'), 'É-test', "Testing accentuated characters");
    assert.equal(UpperFirstLetter(''), '', "Empty string");
    assert.equal(UpperFirstLetter(null), '', "Null argument should give an empty string");
    assert.equal(UpperFirstLetter('this is a test for a long character chain.'), 'This is a test for a long character chain.', "Testting a long string");
  });

  QUnit.test('UnpackObjectPropertiesAsArrays()', assert => {
    var obj = {value: {test: {x: 24}}};

    assert.equal(UnpackObjectPropertiesAsArrays(obj, ''), obj, "Basic testing");
    assert.equal(UnpackObjectPropertiesAsArrays(obj, 'value'), obj.value, "Result should be 'value' object");
    assert.equal(UnpackObjectPropertiesAsArrays(obj, 'value.test'), obj.value.test, "Result should be 'test' object");
    assert.equal(UnpackObjectPropertiesAsArrays(obj, 'value.test.x'), obj.value.test.x, "Result should be 'x' object");
  });

});
