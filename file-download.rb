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

  	files = text.scan(/\w+\.dat(?=")/)

  	# puts files.length

  	if files.length <= 0
			puts "file doesn't match"
			exit!
		end

		files
  end
end

def download_files
	file_names = get_filenames

	puts file_names

	file_names.each do |name|
		url = "http://www-utap.phys.s.u-tokyo.ac.jp/~nishimichi/misc/cosmic_sound/powerspec/#{name}"

		text = fetch_url(url)

		save_file("data/powerspecs/#{name}", text)
	end
end

def sort_out_file(file_names)
	cdms = []
	baryons = []
	neutrinos = []
	photons = []
	totals = []

	puts file_names.size

	file_names.each do |name|
		url = Dir.pwd + "/data/powerspecs/#{name}"

		text = fetch_url(url)

		tmp_cdms = []
		tmp_baryons = []
		tmp_neutrinos = []
		tmp_photons = []
		tmp_totals = []

		rows = text.split(/\n/)

		puts rows.length

		rows.each do |row|
			columns = row.split(" ")

			tmp_cdms.push(columns[1]);
			tmp_baryons.push(columns[2])
			tmp_neutrinos.push(columns[3])
			tmp_photons.push(columns[4])
			tmp_totals.push(columns[5])
		end

		# puts tmp_cdms

		cdms.push(tmp_cdms.join(" "))
		baryons.push(tmp_baryons.join(" "))
		neutrinos.push(tmp_neutrinos.join(" "))
		photons.push(tmp_photons.join(" "))
		totals.push(tmp_totals.join(" "))
	end

	ret_val = {}
	ret_val[:CDM] = cdms.join("\n")
	ret_val[:baryon] = baryons.join("\n")
	ret_val[:neutrino] = neutrinos.join("\n")
	ret_val[:photon] = photons.join("\n")
	ret_val[:total] = totals.join("\n")

	return ret_val
end

def recreate_file
	file_names = get_filenames

	puts file_names

	contents = sort_out_file(file_names)

	contents.each do |name, content|
		url = Dir.pwd + "/data/sort_out/#{name}.dat"
		# puts name
		# puts content
		# puts "____________________________________________"
		# save_file(url, content)
	end

end

def reformat_files
	file_names = get_filenames

	puts file_names

	file_names.each do |name|
		url = "data/powerspec/#{name}"

		text = fetch_url(url)

		rows = text.scan(/\n/)
	end

end

def main
	# reformat_files()
	recreate_file()
end

main()

