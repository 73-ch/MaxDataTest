require 'open-uri'

def fetch_url(_url)
   open(_url) do |file|
    return file.read
  end
end

def save_file(_path, _content)
	open(_path, "w") do |out|
		out.write(_content)
	end
end

def get_filenames
	open("http://www-utap.phys.s.u-tokyo.ac.jp/~nishimichi/misc/cosmic_sound/powerspec/") do |file|
  	text = file.read
  	files = text.scan(/\w+\.dat/)
  end
end

def download_files
	file_names = get_filenames

	puts file_names

	file_names.each do |name|
		url = "http://www-utap.phys.s.u-tokyo.ac.jp/~nishimichi/misc/cosmic_sound/powerspec/#{name}"

		text = fetch_url(url)

		save_file("data/powerspec/#{name}", text)
	end

end

def main
	download_files()
end

main()

