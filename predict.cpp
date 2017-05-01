
/*
Frank Cusano
Parallel Term Project
*/

#include<omp.h>
#include<ctime>
#include<iostream>
#include<fstream>
#include<vector>
#include<string>
#include<sstream>
#include<typeinfo>

using namespace std;

vector<vector<string> > parsef(istream& str);
float find_loc(vector<vector<string> > data);
float find_avg_mag(vector<vector<string> > data);

int main(int argc, char* argv[]){

    // Open and test the input file.
	ifstream inFile(argv[1]);
	if (!inFile) {
		cerr << "Could not open " << argv[1] << " to read\n";
		return 1;
	}

    vector<vector<string> > data = parsef(inFile);

    clock_t start = clock();

    #pragma omp parallel
    {
    cout << omp_get_num_threads() << endl;
    int i;
    #pragma omp for private(i)
    for (i = 0; i < data.size()-1; i++){
        string date = data[i][0];
        string lati = data[i][1];
        string loni = data[i][2];
        string magn = data[i][4];

        float lat = stof(lati);
        float lon = stof(loni);
        float mag = stof(magn);   
    }

    float location = find_loc(data);
    float mag = find_avg_mag(data);

    cout << "location = " << location << endl;
    cout << "mag = " << mag << endl;
    }
    clock_t finish = clock();
    double timed = double(finish - start) / CLOCKS_PER_SEC;
    cout << "time elapsed = " << timed << endl;
    return 0;
}


vector<vector<string> > parsef(istream& str){
    vector<vector<string> > result;

    string line;

    char delim[] = ",";
    char* token;

    getline(str,line);
    while(!str.eof()){

        vector<string> words;
        getline(str, line);

        istringstream ss(line);
        string token;

        while(getline(ss, token, ',')){
            words.push_back(token);
        }

        result.push_back(words);
    }

    return result;
}


float find_loc(vector<vector<string> > data){

    vector<float> loc_lat;
    vector<float> loc_lon;

    #pragma omp parallel for
    for (int i = 0; i < data.size()-1; i++){
        string lati2 = data[i][1];
        string loni2 = data[i][2];
        float lati = stof(lati2);
        float loni = stof(loni2);

        for (int j = 0; j < data.size()-1; j++){
            string latj2 = data[j][1];
            string lonj2 = data[j][2];
            float latj = stof(latj2);
            float lonj = stof(lonj2);
            if ((lati - latj) + (loni - lonj) < 10){
                
                float avg_lat = (lati + latj) / 2;
                float avg_lon = (lati + latj) / 2;
                loc_lat.push_back(avg_lat);
                loc_lon.push_back(avg_lon);
            }
        }
    }

    return loc_lon.front();
}

float find_avg_mag(vector<vector<string> > data){

    float total = 0.0;
 
    #pragma omp parallel for
    for (int i = 0; i < data.size()-1; i++){
        string magn = data[i][4];
        float mag = stof(magn);

        total += mag;
    }

    return total / data.size();

}