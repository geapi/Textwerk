# ===========================================================================
# Project:   TwSprout
# Copyright: ©2010 My Company, Inc.
# ===========================================================================

# Add initial buildfile information here
config :all, :required => :sproutcore

proxy "/searchPubmed", :to => "localhost:3000"