/**
 * Define a jsdoc plugin to update inherited properties, i.e. add properties if annotated by @augments.
 *
 * adapted from https://stackoverflow.com/a/51778256/4278324
 */
exports.handlers = {
  /**
   * Modify doclets that use augments (extends) and have properties.  Add the base typedef's
   * properties to the augmented doclets.
   */
  parseComplete: function (e) {
    var allDoclets = {},
        augmentedDoclets = {},
        numAugmented = 0;
    // Make a dictionary of all doclets and a dictionary of augmented doclets
    e.doclets.forEach(function (doclet) {
    allDoclets[doclet.longname] = doclet;
    if (doclet.augments && doclet.augments.length) {
      augmentedDoclets[doclet.longname] = doclet;
    }
    });
    while (Object.keys(augmentedDoclets).length !== numAugmented) {
      numAugmented = Object.keys(augmentedDoclets).length;
      Object.keys(augmentedDoclets).forEach(function (name) {
        var doclet = augmentedDoclets[name];
        // If this doclet is augmented by an augmented doclet, skip it for
        // now.  Ignore self references
        if (doclet.augments.some(function (augmentName) {
          return augmentName !== name && augmentedDoclets[augmentName];
        })) {
          return;
        }
        // Ensure we have properties
        doclet.properties = doclet.properties || [];
        // Make a dictionary so we don't clobber known properties.
        var properties = {};
        doclet.properties.forEach(function (prop) {
          properties[prop.name] = prop;
        });
         // For each augment base, add its properties if we don't already have
         // them.  If the doclet augments two other doclets that each have a
         // property of the same name, the last listed will be shown (done by
         // reversing the augments list).
        doclet.augments.slice().reverse().forEach(function (augmentName) {
          if (augmentName !== name && allDoclets[augmentName] && allDoclets[augmentName].properties) {
            allDoclets[augmentName].properties.forEach(function (prop) {
              if (!properties[prop.name]) {
                // Make a copy so we don't mutate the original property
                prop = Object.assign({}, prop);
                 // Add a value that a rendering template could use to show that
                 // the property was inherted from a parent.  Since that in turn
                 // could have been inherited, preserve a known value.
                 prop.inherited = true;//MOD inherited is BOOLEAN!
                 prop.inherits = prop.inherits || augmentName;//MOD set inheritance information to inherits instead!
                 // Add the property to the doclet and to the list of known
                 // properties.
                doclet.properties.push(prop);
                properties[prop.name] = prop;
              }
            });
          }
        });
         // We've finished processing this doclet, so remove it from the
         // augmented list.
        delete augmentedDoclets[name];
      });
    }
  }
};
