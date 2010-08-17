# ===========================================================================
# Project:   TextWerk
# Copyright: ©2010 My Company, Inc.
# ===========================================================================

# Add initial buildfile information here

config :all, :required => :sproutcore, :theme => 'text_werk'

proxy "/searchPubmed", :to => "localhost:3000"
proxy "/getResultsCount", :to => "localhost:3000"