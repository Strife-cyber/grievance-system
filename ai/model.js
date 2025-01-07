import fs from 'fs';
import natural from 'natural';

class Ai {
    constructor(dataFilePath = 'ai/data.json') {
        this.dataFilePath = dataFilePath;
        this.categoryClassifier = new natural.BayesClassifier();
        this.priorityClassifier = new natural.BayesClassifier();
        this.roleClassifier = new natural.BayesClassifier();

        // Load existing training data and train the model
        const trainingData = this.loadTrainingData();
        if (trainingData.length > 0) {
            this.trainModel(this.prepareTrainingData(trainingData));
        } else {
            console.log("Not enough training data available.");
        }
    }

    // Load the training data from a file
    loadTrainingData() {
        if (fs.existsSync(this.dataFilePath)) {
            return JSON.parse(fs.readFileSync(this.dataFilePath));
        }
        return [];
    }

    // Prepare the training data in the format we need
    prepareTrainingData(data) {
        return data.map(item => ({
            text: item.text,
            category: item.category,
            priority: item.priority,
            roles: item.roles
        }));
    }

    // Train the classifiers with the provided data
    trainModel(data) {
        data.forEach(item => {
            this.categoryClassifier.addDocument(item.text, item.category);
            this.priorityClassifier.addDocument(item.text, item.priority);
            this.roleClassifier.addDocument(item.text, item.roles.join(',')); // Join roles as a string for classification
        });

        this.categoryClassifier.train();
        this.priorityClassifier.train();
        this.roleClassifier.train();
    }

    // Save new data to the JSON file
    saveNewData(newData) {
        const data = this.loadTrainingData();
        data.push(newData);
        fs.writeFileSync(this.dataFilePath, JSON.stringify(data, null, 2));
    }

    // Predict the category, priority, and roles based on input text
    predict(text) {
        const categoryScores = this.categoryClassifier.getClassifications(text);
        const priorityScores = this.priorityClassifier.getClassifications(text);
        const roleScores = this.roleClassifier.getClassifications(text);

        const highestCategory = categoryScores[0];
        const highestPriority = priorityScores[0];
        const highestRoles = roleScores[0];

        return {
            category: highestCategory.label,
            categoryScore: highestCategory.value,
            priority: highestPriority.label,
            priorityScore: highestPriority.value,
            roles: highestRoles.label.split(',') // Return roles as an array
        };
    }

    // Learn and update the model with new data
    learnAndUpdate(text, predictedCategory, predictedPriority, predictedRoles) {
        const newGrievance = {
            text: text,
            category: predictedCategory,
            priority: predictedPriority,
            roles: predictedRoles
        };

        this.saveNewData(newGrievance);
        const updatedData = this.loadTrainingData();
        this.trainModel(this.prepareTrainingData(updatedData)); // Retrain with updated data
    }

    // Main function to handle prediction and learning
    handleTextInput(text) {
        const prediction = this.predict(text);
        /*console.log(`Predicted Category: ${prediction.category} (Score: ${prediction.categoryScore})`);
        console.log(`Predicted Priority: ${prediction.priority} (Score: ${prediction.priorityScore})`);
        console.log(`Recommended Roles: ${prediction.roles.join(', ')}`);*/

        this.learnAndUpdate(text, prediction.category, prediction.priority, prediction.roles);

        return prediction;
    }
}

export default Ai;
