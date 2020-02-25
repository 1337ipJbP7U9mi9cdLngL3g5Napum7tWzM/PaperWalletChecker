source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '2.6.4'

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
  gem 'capistrano',         require: false
  gem 'capistrano-linked-files', require: false
  gem 'rvm1-capistrano3', require: false
  gem 'capistrano-bundler', '~> 1.6', require: false
end
