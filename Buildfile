# ===========================================================================
# Project:   Textwerk
# Copyright: ©2010 My Company, Inc.
# ===========================================================================

# Add initial buildfile information here
config :all, :required => :sproutcore

# CORE FRAMEWORKS
config :scui, :required => [:sproutcore, :'scui/drawing', :'scui/linkit']
config :'core-textwerk', :required => [:sproutcore, :'scui/drawing', :'scui/linkit']
#config :'papercube', :required => [:sproutcore]

# CONFIGURE THEMES
config :standard_theme, 
  :theme_name => 'linkit-theme',
  :test_required  => ['sproutcore/testing'],
  :debug_required => ['sproutcore/debug']
  
# This configuration section will be applied to all bundles used by your
# application, even bundles that come from other gems.  
config :textwerk do |c|
  c[:required] = [:'core-textwerk', :ki, :sproutcore, :scui]
  c[:theme] = :standard_theme
end

proxy "/documents", :to => "localhost:3000"
proxy "/authors", :to => "localhost:3000"
proxy "/venues", :to => "localhost:3000"
proxy "/affiliations", :to => "localhost:3000"