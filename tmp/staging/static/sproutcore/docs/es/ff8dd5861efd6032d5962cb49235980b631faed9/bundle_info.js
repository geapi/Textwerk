        ;(function() {
          var target_name = 'sproutcore/standard_theme' ;
          if (!SC.BUNDLE_INFO) throw "SC.BUNDLE_INFO is not defined!" ;
          if (SC.BUNDLE_INFO[target_name]) return ; 
          
          SC.BUNDLE_INFO[target_name] = {
            requires: ['sproutcore/empty_theme'],
            styles:   ['/static/sproutcore/standard_theme/es/52920dfdad7f0329367ed5692a2fc96881122edb/stylesheet-packed.css','/static/sproutcore/standard_theme/es/52920dfdad7f0329367ed5692a2fc96881122edb/stylesheet.css'],
            scripts:  ['/static/sproutcore/standard_theme/es/52920dfdad7f0329367ed5692a2fc96881122edb/javascript-packed.js']
          }
        })();
