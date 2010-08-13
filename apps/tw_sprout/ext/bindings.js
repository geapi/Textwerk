// details here: http://gist.github.com/522923

SC.mixin(SC.Binding, {
  firstObject: function() {
    return this.transform(function(value, isForward) {
      if (value && value.isEnumerable) {
        value = value.firstObject();
      }
      return value;
    });
  }
});